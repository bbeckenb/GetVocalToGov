"use strict";

const User = require("./User");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

//test Basic Model
describe("check to see if basic User was stored in db from _testCommon", function () {
    test("model and register works", async function () {
        const testUser1 = {
            firstName:"Jimmothy", 
            lastName:"Deanus", 
            username:"JDean12", 
            password:"1234", 
            address:"my house", 
            email:"jdean@gmail.com", 
            isAdmin:true,
         }
        const res = await User.register(testUser1);
        expect(res).toBeInstanceOf(User);
        expect(res.firstName).toEqual("Jimmothy");
        expect(res.email).toEqual("jdean@gmail.com");
        expect(res.isAdmin).toEqual(true);
        });
});

