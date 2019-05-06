import {  expect, assert }  from "chai";

describe("Calcultator tests using ASSERT interface from CHAI module: ", function() {
    describe("Check addTested Function: ", function() {
        it("Check the returned value using: assert.equal(value,'value'): ", function() {
            assert.equal("text tested", "text tested");
        });
        it("Check the returned value using: assert.typeOf(value,'value'): ", function() {
            assert.typeOf("hola", "string");
        });
        it("Check the returned value using: assert.lengthOf(value,'value'): ", function() {
            assert.lengthOf("test", 4);
        });

    });
});


