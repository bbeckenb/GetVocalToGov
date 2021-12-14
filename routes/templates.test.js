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
                postId: null,
                userId: "JDean1"
             }
        });
    });

    test("works, sets postId to actual id if parameter included", async function () {
        const grabPostId = await db.query(`SELECT id FROM posts WHERE title='test title'`);
        const { id } = grabPostId.rows[0];
        const newTemplate = {
            title: "test title 2", 
            body: "test template body 2",
            postId: id
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
                userId: "JDean1"
             }
        });
    });

    test("if no token unauth", async function () {
        const res = await request(app)
        .post(`/templates`)
        
        expect(res.statusCode).toEqual(401);
    });

    test("if all fields not filled in, bad request", async function () {
        const badTemplate = {
            link:"https://kdvr.com/news/coronavirus/omicron-variant-case-confirmed-in-boulder-county/", 
            body: "we need to do q, r, s", 
        }
        const res = await request(app)
            .post(`/templates`)
            .set("authorization", `Bearer ${testUser0TokenAdmin}`)
            .send(badTemplate);

        expect(res.statusCode).toEqual(400);
    });
});

describe("GET /templates/:templateId", function () {
    test("works", async function () {
        const templateSearch = await db.query(`SELECT id FROM templates WHERE title='test title'`);
        const { id } = templateSearch.rows[0];
        const res = await request(app)
            .get(`/templates/${id}`)
            .set("authorization", `Bearer ${testUser0TokenAdmin}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({
            template: {
                id: id,
                title: "test title", 
                body: "test template body",
                userId: "JDean1",
                postId: expect.any(Number)
            }
        });
    });

    test("if no token unauth", async function () {
        const res = await request(app)
            .get(`/templates/0`)

        expect(res.statusCode).toEqual(401);
    });

    test("if template DNE, not found", async function () {
        const res = await request(app)
            .get(`/templates/0`)
            .set("authorization", `Bearer ${testUser0TokenAdmin}`);

        expect(res.statusCode).toEqual(404);
    });
});

describe("PATCH /templates/:templateId", function () {
    test("works", async function () {
        const templateSearch = await db.query(`SELECT id FROM templates WHERE title='test title'`);
        const { id } = templateSearch.rows[0];

        const res = await request(app)
            .patch(`/templates/${id}`)
            .send({
                title: 'updated title',
                body: 'updated body'
            })
            .set("authorization", `Bearer ${testUser0TokenAdmin}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ 
            template: {
                id: id,
                title: 'updated title',
                body: 'updated body',
                userId: "JDean1",
                postId: expect.any(Number)
            }
        });
    });

    test("if template DNE, not found", async function () {
        const res = await request(app)
            .patch(`/templates/0`)
            .send({
                title: 'updated title',
                body: 'updated body'
            })
            .set("authorization", `Bearer ${testUser0TokenAdmin}`);

        expect(res.statusCode).toEqual(404);
    });

    test("if user is not owner or admin, unauth", async function () {
        const templateSearch = await db.query(`SELECT id FROM templates WHERE title='test title'`);
        const { id } = templateSearch.rows[0];

        const res = await request(app)
            .patch(`/templates/${id}`)
            .send({
                title: 'updated title',
                body: 'updated body'
            })
            .set("authorization", `Bearer ${testUser1TokenNonAdmin}`);

        expect(res.statusCode).toEqual(401);
    });

    test("if no token, unauth", async function () {
        const templateSearch = await db.query(`SELECT id FROM templates WHERE title='test title'`);
        const { id } = templateSearch.rows[0];

        const res = await request(app)
            .patch(`/templates/${id}`)

        expect(res.statusCode).toEqual(401);
    });

    test("if all data not included bad request", async function () {
        const templateSearch = await db.query(`SELECT id FROM templates WHERE title='test title'`);
        const { id } = templateSearch.rows[0];

        const res = await request(app)
            .patch(`/templates/${id}`)
            .send({
                body: 'updated body'
            })
            .set("authorization", `Bearer ${testUser0TokenAdmin}`);

        expect(res.statusCode).toEqual(400);
    });
});

describe("DELETE /templates/:templateId", function () {
    test("works", async function () {
        const templateSearch = await db.query(`SELECT id FROM templates WHERE title='test title'`);
        const { id } = templateSearch.rows[0];
        const res = await request(app)
            .delete(`/templates/${id}`)
            .set("authorization", `Bearer ${testUser0TokenAdmin}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({
            deleted: Number(id)
        });
    });

    test("if no token unauth", async function () {
        const res = await request(app)
            .delete(`/templates/0`)

        expect(res.statusCode).toEqual(401);
    });

    test("if template DNE, not found", async function () {
        const res = await request(app)
            .delete(`/templates/0`)
            .set("authorization", `Bearer ${testUser0TokenAdmin}`);

        expect(res.statusCode).toEqual(404);
    });

    test("if User does not have ownership of template Unauth", async function () {
        const templateToDelete = await db.query(`SELECT id FROM templates WHERE title='test title'`);
        const { id } = templateToDelete.rows[0];
        const res = await request(app)
            .delete(`/templates/${id}`)
            .set("authorization", `Bearer ${testUser1TokenNonAdmin}`)

        expect(res.statusCode).toEqual(401);
    });
});