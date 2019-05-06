import { assert } from "chai";

//import UserDto from "./../../../src/models/dto/userDto";

import * as sinon from "sinon";

require("sinon-mongoose");

import models from "models/db";

import UserDao from "models/dao/userDao";
import seed from "seeders";

describe("Test de UserDao", () => {

    beforeEach(() => {

    });

    describe("Verificando metodo findAll ", () => {
        it("verificando la respuesta de find all", done => {
            sinon.restore();
            sinon
                .mock(models.User)
                .expects("find")
                .returns(seed.userSeed);

            let dao = new UserDao();
            const users = dao.findAll();

            assert.equal(users.length, 2);
            assert.equal(users[0].username, seed.userSeed[0].username);
            done();
        });
    });
});
