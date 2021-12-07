'use strict';

const db = require("../db.js");
const Template = require('./Template');
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

//test Basic Model
describe('check to see if basic Template can be created', function () {
    test('model and create works', async function () {
        const testTemplate1 = {
            title: 'test title', 
            body: 'we need to do x, y, z', 
         }
        
        const res = await Template.create(testTemplate1);
        expect(res).toBeInstanceOf(Template);
        expect(res.id).toEqual(expect.any(Number));
        expect(res.title).toEqual('test title');
        expect(res.body).toEqual('we need to do x, y, z');
    });
});

describe("_templateExists", function () {
    test("returns bool true if template exists", async function () {
        const grabtemplateId = await db.query(
            `SELECT id FROM templates WHERE title='test title'`);
        const { id } = grabtemplateId.rows[0];
        const check = await Template._templateExists(id);
        expect(check).toEqual(true);
    });

    test("returns bool false if template DNE", async function() {
        const check = await Template._templateExists(0);
        expect(check).toEqual(false);
    });
});

describe('getTemplate', function () {
    test("returns Template instance if id exists in db", async function () {
        const grabTemplateId = await db.query(
            `SELECT id FROM templates WHERE title='test title'`);
        const { id } = grabTemplateId.rows[0];
        const res = await Template.getTemplate(id);
        expect(res).toBeInstanceOf(Template);
        expect(res.id).toEqual(expect.any(Number));
        expect(res.body).toEqual('test template body');
    });

    test("returns NotFound if Template id DNE", async function () {
        try {
            await Template.getTemplate(0);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }  
    });
});

describe("update", function () {
    test("works", async function () {
        const grabtemplateId = await db.query(
            `SELECT id FROM templates WHERE title='test title'`);
        const { id } = grabtemplateId.rows[0];
        const updateData = {
            title: "test title updated", 
            body: "body updated",   
         }
         const updatedtemplate = await Template.update(id, updateData);
         expect(updatedtemplate).toBeInstanceOf(Template);
         expect(updatedtemplate.title).toEqual("test title updated");
         expect(updatedtemplate.body).toEqual("body updated")
    });

    test("throws NotFound error if id Does Not Exist", async function () {
        try {
            await Template.update(0, {});
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }   
    });
});

describe("deleteTemplate", function () {
    test("works", async function () {
        const grabTemplateId = await db.query(
            `SELECT id FROM templates WHERE title='test title'`);
        const { id } = grabTemplateId.rows[0];
        await Template.deleteTemplate(id);
        const res = await db.query(
            `SELECT * FROM templates WHERE id=${id}`);
        expect(res.rows.length).toEqual(0);
    });

    test("throws NotFound if user DNE", async function () {
        try {
            await Template.deleteTemplate(0);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }  
    });
});