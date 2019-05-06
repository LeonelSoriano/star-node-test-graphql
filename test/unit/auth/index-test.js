import { assert } from "chai";

import seed from "seeders";

import { generateJwt, verificateToken } from "auth/index.js";
import UserDto from "models/dto/userDto";

describe("Test de generacion y verificacion de jwt", () => {
    describe("Generacion de un jwt ", () => {

        let userDto = new UserDto();
        userDto.username = seed.userSeed[0].username;

        let token1 = generateJwt(userDto);

        let token2 = generateJwt(null);

        it("token es de tipo string", () => {
            assert.typeOf(token1, "string");
        });

        it("token no es null", () => {
            assert.notEqual(token1, null);
        });

        it("generando token desde un null", () => {
            assert.equal(token2, null);
        });
    });

    describe("Verificacion de un jwt ", () => {
        let validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imxlb25lbCIsImlkIjowLCJpYXQiOjE1NTY"+
            "3NzA2NjUsImV4cCI6NDE0ODc3MDY2NSwic3ViIjoibG9naW4ifQ.Mcr_ONcINkYWKFruVqrL-Od4WneWsEF8qckkG1NVgbw";
        let invaliToken = "isInvalid";
        let tokenInvalidDate = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NTY3MzU0OTgsImV4cCI6MTU1NjQ3NjI5OCwi"+
            "c3ViIjoiaWQifQ.mHCuMiVKdlfmnrkek3G-VF1Rm0eaP-ceJpyWhWFldZ0";
        let tokenNull = null;

        it("Verificando token valido", () => {
            let decodeToken = verificateToken(validToken);
            assert.typeOf(decodeToken, "object");
            assert.equal(decodeToken.id, 0);
        });

        it("Verificando token invalido", () => {
            let decodeToken = verificateToken(invaliToken);
            let decodeTokenNull = verificateToken(tokenNull);
            let decodeTokenInvalidDate = verificateToken(tokenInvalidDate);

            assert.isTrue(decodeToken === null );
            assert.isTrue(decodeTokenNull === null );
            assert.isTrue(decodeTokenInvalidDate === null );
        });
    });
});
