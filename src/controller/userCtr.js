"use strict";

import UserDao from "../models/dao/userDao";

/**
 * Modelo que posee la entidad de usuario.
 */
class UserCtr {

    /**
    * @return {object} regresa todas los usuarios
    */
    listUser(){
        let us = new UserDao();
        return us.findAll();
    }
}


export {UserCtr};
