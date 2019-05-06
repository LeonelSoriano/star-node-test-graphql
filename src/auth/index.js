"use strict";

import jwt from "jsonwebtoken";


import logger from "../until/logger";
import dotenv from "dotenv";
dotenv.config();

/**
 * genera un token apartir de un usuario enviado
 * @param {objet::User} genera un token apartir de un usuario
 * @return {string} token creado
 */
const generateJwt = user => {
    try {
        return jwt.sign({ username: user.username, id: user.id }, process.env.JWT_SECRET_PASS, {
            expiresIn: 864000000 * 3,
            subject: "login"
        });
    } catch (e) {
        logger.log("info", `generateJwt= Dato de tipo invalido ${JSON.stringify(user)}`);
        return null;
    }
};

/**
 * Verifica el token enviado
 * @param {string} token que se Verificara
 * @return {objet} verdadero si el token es valido de tener un error es null
 */
const verificateToken = token => {
    if (token == undefined || token == null) {
        return null;
    }
    try {
        return jwt.verify(token, process.env.JWT_SECRET_PASS);
    } catch (err) {
        logger.log("error", err.stack);
        return null;
    }
};

export { generateJwt, verificateToken };
