"use strict";

import models from "models/db";
import logger from "until/logger";

export default class UserDao {
    constructor() {}
    findAll() {
        try {
            let users = models.User.find({});
            return users;
        } catch (err) {
            logger.log("error", err.stack);
            return [];
        }
    }
}
