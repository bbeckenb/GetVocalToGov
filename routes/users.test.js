"use strict";

const request = require("supertest");
const app = require("../app");
const User = require("../models/User");

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
    testUser0TokenAdmin,
    testUser1TokenNonAdmin
} = require('./_testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("GET /users/:username", function () {
    test("works", async function () {
        const res = await request(app)
            .get("/users/JDean1")
            .set("authorization", `Bearer ${testUser1TokenNonAdmin}`);
        
        expect(res.body).toEqual({
            user: {
                firstName: 'Jimmy',
                lastName: 'Dean',
                username: 'JDean1',
                password: expect.any(String),
                address: 'my house',
                email: 'jdean@gmail.com',
                isAdmin: true
              }
        });
        expect(res.statusCode).toEqual(200);
    });

    test("sends unauth err if requestor doesn't have a valid token", async function () {
        const res = await request(app)
            .get("/users/JDean1");
        
        expect(res.statusCode).toEqual(401);
    });

    test("sends not found err if username not in db", async function () {
        const res = await request(app)
            .get("/users/wrongo")
            .set("authorization", `Bearer ${testUser1TokenNonAdmin}`);
        
        expect(res.statusCode).toEqual(404);
    });
});

describe("PATCH /users/:username", function () {
    test("works", async function () {
        const res = await request(app)
            .patch("/users/JDean1")
            .send({
                firstName: 'Jammy',
                lastName: 'Dane',
                username: 'JDean12',
                password: '1234',
                address: 'your house',
                email: 'jdean1@gmail.com',              
            })
            .set("authorization", `Bearer ${testUser0TokenAdmin}`);

        expect(res.body).toEqual({
            user: {
                password: expect.any(String),
                firstName: 'Jammy',
                lastName: 'Dane',
                username: 'JDean12',
                address: 'your house',
                email: 'jdean1@gmail.com', 
                isAdmin: true             
              }
        });
        
        expect(res.statusCode).toEqual(200);
    });

    test("sends unauth err if requestor doesn't have a valid token", async function () {
        const res = await request(app)
            .patch("/users/JDean1");
        
        expect(res.statusCode).toEqual(401);
    });

    test("sends unauth err if not same user or admin", async function () {
        const res = await request(app)
            .patch("/users/JDean1")
            .send({
                firstName: 'Jammy',
                lastName: 'Dane',
                username: 'JDean12',
                password: '1234',
                address: 'your house',
                email: 'jdean1@gmail.com',              
            })
            .set("authorization", `Bearer ${testUser1TokenNonAdmin}`);
        
        expect(res.statusCode).toEqual(401);
    });

    test("sends bad request err if data doesn't match jsonschema", async function () {
        const res = await request(app)
            .patch("/users/JDean1")
            .send({
                password: '1234',
                address: 'your house',
                email: 'jdean1@gmail.com',              
            })
            .set("authorization", `Bearer ${testUser0TokenAdmin}`);
        
        expect(res.statusCode).toEqual(400);
    });
});

describe("DELETE /users/:username", function () {
    test("works", async function () {
        const res = await request(app)
            .delete("/users/JDean1")
            .set("authorization", `Bearer ${testUser0TokenAdmin}`);

        expect(res.body).toEqual({ deleted: 'JDean1' });
        expect(res.statusCode).toEqual(200);
    });

    test("sends unauth err if token does not match requested username for deletion", async function () {
        const res = await request(app)
            .delete("/users/JDean1")
            .set("authorization", `Bearer ${testUser1TokenNonAdmin}`);

        expect(res.statusCode).toEqual(401);
    });

    test("sends not found err if username DNE token does not match requested username for deletion", async function () {
        const res = await request(app)
            .delete("/users/wrongo")
            .set("authorization", `Bearer ${testUser0TokenAdmin}`);

        expect(res.statusCode).toEqual(404);
    });

    test("sends unauth if no token", async function () {
        const res = await request(app)
            .delete("/users/JDean1")
            
        expect(res.statusCode).toEqual(401);
    });
});