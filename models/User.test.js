"use strict";
const db = require("../db");
const User = require("./User");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
  } = require("../expressError");
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
        expect(res.password.startsWith("$2b$")).toEqual(true);
    });
});

describe("authenticate", function () {
    test("works", async function () {
        // const users = await db.query('SELECT * FROM users');
        const user = await User.authenticate('JDean1', '1234');
        expect(user).toBeInstanceOf(User);
        expect(user.email).toEqual("jdean@gmail.com");
        expect(user.isAdmin).toEqual(true);
        expect(user.password.startsWith("$2b$")).toEqual(true);
    });
    
    test("throws Unauthorized error if pw is wrong", async function () {
        try {
            /*TestUser0 from _testCommon
            username:"JDean1", 
            password:"1234",  */
            await User.authenticate('JDean1', '123WRONG');
            fail();
        } catch (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy();
        }   
    });

    test("throws NotFound error if username is invalid", async function () {
        try {
            /*TestUser0 from _testCommon
            username:"JDean1", 
            password:"1234",  */
            await User.authenticate('WRONGO', '1234');
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }   
    });
});

describe("update", function () {
    test("works", async function () {
        const updateData = {
            firstName:"Jammy", 
            lastName:"Dane", 
            username:"JDean1", 
            password:"1234", 
            address:"your house", 
            email:"jdean1@gmail.com", 
            isAdmin:true,
         }
         const updatedUser = await User.update('JDean1', updateData);
         expect(updatedUser.firstName).toEqual('Jammy');
         expect(updatedUser.lastName).toEqual('Dane');
         expect(updatedUser.id).toEqual(expect.any(Number));
    });

    test("throws NotFound error if username is invalid", async function () {
        try {
            /*TestUser0 from _testCommon
            username:"JDean1", 
            password:"1234",  */
            await User.update('WRONGO', {});
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }   
    });

    test("throws Unauthorized error if pw is wrong", async function () {
        try {
            /*TestUser0 from _testCommon
            username:"JDean1", 
            password:"1234",  */
            await User.update('JDean1', {password: 'WRONGO'});
            fail();
        } catch (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy();
        }   
    });
});

describe("_usernameExists", function () {
    test("returns bool true if username exists", async function () {
        //check existing test username
        const check = await User._usernameExists('JDean1');
        expect(check).toEqual(true);
    });

    test("returns bool false if username DNE", async function() {
        const check = await User._usernameExists('usernameDNE');
        expect(check).toEqual(false);
    });
});

describe("getUser", function () {
    test("returns User instance if username exists", async function () {
        const res = await User.getUser('JDean1');

        expect(res).toBeInstanceOf(User);
        expect(res.id).toEqual(expect.any(Number));
        expect(res.firstName).toEqual("Jimmy");
        expect(res.email).toEqual("jdean@gmail.com");
        expect(res.isAdmin).toEqual(true);
        expect(res.password.startsWith("$2b$")).toEqual(true);
    });

    test("NotFound error if username DNE", async function () {
        try {
            /*TestUser0 from _testCommon
            username:"JDean1", 
            password:"1234",  */
            await User.getUser('WRONGO');
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }   
    });
});

describe("deleteUser", function () {
    test("works", async function () {
        await User.deleteUser('JDean1');
        const res = await db.query(
            "SELECT * FROM users WHERE username='JDean1'");
        expect(res.rows.length).toEqual(0);
    });

    test("throws NotFound if user DNE", async function () {
        try {
            /*TestUser0 from _testCommon
            username:"JDean1", 
            password:"1234",  */
            await User.deleteUser('WRONGO');
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }  
    });
});

