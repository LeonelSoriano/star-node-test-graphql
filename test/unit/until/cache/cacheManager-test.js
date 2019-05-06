"use strict";

import { assert, expect } from "chai";

import cacheManager from "cache-manager";

import CacheManagerApp from "until/cache/cacheManagerApp";

const helperFunAddKey = (key, value) => {
    let memoryCache = cacheManager.caching({ store: "memory", max: 100, ttl: 100 });
    let cacheManagerApp = new CacheManagerApp();
    cacheManagerApp.setMemoryCache(memoryCache);
    cacheManagerApp.setValue(key, value.id, value, 400, () => {});
    return cacheManagerApp.getValue(key, value.id);
};

let timeout   = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const helperFunVerifyDefaultValue = async (key, value, newDefault) => {
    let memoryCache = cacheManager.caching({ store: "memory", max: 100, ttl: 100 });
    let cacheManagerApp = new CacheManagerApp();
    cacheManagerApp.setMemoryCache(memoryCache);
    cacheManagerApp.setValue(key, value.id, value, 0.1, () => {});
    let firstValue = await cacheManagerApp.getValue(key, value.id);

    await timeout(200);

    let secondValue = await cacheManagerApp.getValue(key, value.id, ()=> {return newDefault;});

    return { firstValue , secondValue};
};





describe("Test para cache manager ", () => {
    it("Se verifica el insert en cache", async () => {
        let testObject = {
            id: "1",
            value: "test value"
        };
        let nameCacheTest = "testObject";

        let val = await helperFunAddKey(nameCacheTest, testObject);
        assert.equal(val.id, testObject.id);
        assert.notEqual(val.value, "fail value");
    });

    it("Se verifica el valor desde el valor por defecto y por la cache", async () => {
        let testObject = {
            id: "1",
            value: "test value"
        };
        let testObjetNew = {
            id: "1",
            value: "new fake value"
        };
        let nameCacheTest = "testObject";
        const values = await helperFunVerifyDefaultValue(nameCacheTest, testObject, testObjetNew);

        assert.equal(values.firstValue.id, testObject.id);
        assert.equal(values.secondValue.id, testObject.id);
        assert.equal(values.firstValue.value, testObject.value);
        assert.equal(values.secondValue.value, testObjetNew.value);
        assert.notEqual(values.firstValue.value, values.secondValue.value);
    });


    it("Se verifica que el canche no se consigue", async () => {

        let fakeCacheName = "soy un fake";
        let fakeId = 123;
        let funCacheGet = () => {
            let memoryCache = cacheManager.caching({ store: "memory", max: 100, ttl: 100 });
            let cacheManagerApp = new CacheManagerApp();
            cacheManagerApp.setMemoryCache(memoryCache);
            return cacheManagerApp.getValue(fakeCacheName, fakeId);
        };

        let value = await funCacheGet();
        assert.isUndefined(value);
    });


});
