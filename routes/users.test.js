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
} = require('./_testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("GET /users/:username", function () {
    test("works", async function () {
        const res = await request(app)
            .post("/auth/token")
            .send({ username: "JDean1", password: "1234" });
        expect(res.body).toEqual({
            "token": expect.any(String)
        });
    });
});

    