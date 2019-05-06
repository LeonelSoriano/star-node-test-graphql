"use strict";

import { assert } from "chai";

import DefaultValues from "until/defaultValues";

describe("Test DefaultValues ", () => {
    it("Se verifican los valores por defecto", () => {
        assert.equal(DefaultValues.BOOLEAN, false);
        assert.equal(DefaultValues.STRING, "");
        assert.equal(DefaultValues.NUMBER, 0);
        assert.isTrue(typeof DefaultValues.OBJECT === "object");
        assert.isTrue(typeof DefaultValues.FUNCTION === "function");
    });
});
