"use strict";

import logger from "until/logger";
import cacheManager from "cache-manager";
import redisStore from "cache-manager-redis";

import dotenv from "dotenv";
dotenv.config();


/**
 * Clase Wrapper de la cache
 */
export default class CacheManagerApp {

    constructor() {
        this.memoryCache = null;
        this.sample = 0;
    }

    /**
    * metodo para cambiar la cache
    * @param {string} valor base de la cache
    * @param {any} valor identificador de la cache especifica
    * @param {number} tiempo en segundos de la cache
    * @param {function} funcion callback
    */
    setValue(key, id, value, ttl, afterSave = null) {
        this._getMemoryCache().set(key + ":" + id, value, { ttl: ttl }, err => {
            if (err) {
                logger.log("error", "CacheManagerApp:setValue no se pudo guardar en cache");
                throw err;
            } else {
                if (afterSave != null) {
                    afterSave();
                }
            }
        });
    }

    /**
    * funcion para obtener valor desde la cache
    * @param {string} valor base de la cache
    * @param {any} valor identificador de la cache especifica
    * @param {function} funcion que devuelve el valor por defecto si la cache no a consigue
    *   ademas de guardar esta nueva como la cache actual
    * @return {any} valor desde la cache
    **/
    async getValue(key, id, defaultValueFunc = null) {
        try {
            if (defaultValueFunc == null) {
                return await this.memoryCache.get(key + ":" + id);
            } else {
                return await this.memoryCache.wrap(key + ":" + id, () => {
                    return defaultValueFunc();
                });
            }
        } catch (err) {
            logger.log("error", "CacheManager:getValue " + err.stack);
        }
    }

    /**
     * remueve un valor de la cache
    * @param {string} valor base de la cache
    * @param {any} valor identificador de la cache especifica
    */
    async deleteValue(key, id) {
        try {
            return await this.memoryCache.delete(key + ":" + id);
        } catch (err) {
            logger.log("error", "CacheManager:getValue " + err.stack);
        }
    }

    removelAll() {}

    /**
    * valor que obtiene la cache redis si no se cambia por una de otro tipo
    * @return {object} tipo de cache
    */
    _getMemoryCache() {
        if (this.memoryCache == null) {
            this.memoryCache = cacheManager.caching({
                store: redisStore,
                host: process.env.REDIS_HOST, // default value
                port: process.env.REDIS_PORT, // default value
                auth_pass: process.env,
                db: 0,
                ttl: process.env
            });

            this.memoryCache.store.events.on("redisError", function(error) {
                logger.log("error", "CacheManagerApp:_getMemoryCache " + error.stack);
            });
        }
        return this.memoryCache;
    }

    /**
    * cambia el tipo de cache por otra
    */
    setMemoryCache(newMemory) {
        this.memoryCache = newMemory;
    }
}
