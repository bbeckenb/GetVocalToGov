"use strict";

const request = require("supertest");
const app = require("../app");
const Template = require("../models/Template");

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
const db = require("../db");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("POST /templates", function () {
    test("works, sets postId null if not present", async function () {
        const newTemplate = {
            title: "test title 2", 
            body: "test template body 2",
            userId: "JDean1",
        }
        const res = await request(app)
            .post(`/templates`)
            .set("authorization", `Bearer ${testUser0TokenAdmin}`)
            .send(newTemplate);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({
            template: { 
                ...newTemplate, 
                id: expect.any(Number),
                postId: null
             }
        });
    });

    // test("if no token unauth", async function () {
    //     const res = await request(app)
    //     .post(`/templates`)
        
    //     expect(res.statusCode).toEqual(401);
    // });

    // test("if all fields not filled in, bad request", async function () {
    //     const badPost = {
    //         link:"https://kdvr.com/news/coronavirus/omicron-variant-case-confirmed-in-boulder-county/", 
    //         body: "we need to do q, r, s", 
    //         tag: "health care", 
    //         location: "FL"
    //     }
    //     const res = await request(app)
    //         .post(`/posts`)
    //         .set("authorization", `Bearer ${testUser0TokenAdmin}`)
    //         .send(badPost);

    //     expect(res.statusCode).toEqual(400);
    // });
});

