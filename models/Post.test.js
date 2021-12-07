'use strict';

const db = require('../db');
const Post = require('./Post');
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
describe('check to see if basic Post can be created', function () {
    test('model and create works', async function () {
        //retrieve testUser0 from db
        const testUserQuery = await db.query(`SELECT id FROM users`);
        const { id } = testUserQuery.rows[0];

        const testPost1 = {
            title: "test title", 
            link:"https://kdvr.com/news/coronavirus/omicron-variant-case-confirmed-in-boulder-county/", 
            body: "we need to do x, y, z", 
            userId: id, 
            tag: "health care", 
            location: "CO"
         }
        
        const res = await Post.create(testPost1);
        expect(res).toBeInstanceOf(Post);
        expect(res.userId).toEqual(expect.any(Number));
        expect(res.id).toEqual(expect.any(Number));
        expect(res.title).toEqual('test title');
        expect(res.tag).toEqual('health care');
    });
});

describe('getPost', function () {
    test("returns Post instance if id exists in db", async function () {
        const grabPostId = await db.query(
            "SELECT id FROM posts WHERE title='test title'");
        const { id } = grabPostId.rows[0];
        const res = await Post.getPost(id);
        expect(res).toBeInstanceOf(Post);
        expect(res.id).toEqual(expect.any(Number));
        expect(res.body).toEqual('we need to do x, y, z');
        expect(res.userId).toEqual(expect.any(Number));
    })

    test("returns NotFound if post id DNE", async function () {
        try {
            await Post.getPost(0);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }  
    })
})

describe("update", function () {
    test("works", async function () {
        const grabPostId = await db.query(
            `SELECT id, user_id FROM posts WHERE title='test title'`);
        const { id, user_id } = grabPostId.rows[0];
        const updateData = {
            title: "test title updated", 
            link:"https://kdvr.com/news/coronavirus/omicron-variant-case-confirmed-in-boulder-county/", 
            body: "we need to do a, b, c", 
            userId: user_id, 
            tag: "health care", 
            location: "CO"
         }
         const updatedPost = await Post.update(id, updateData);
         expect(updatedPost).toBeInstanceOf(Post);
         expect(updatedPost.title).toEqual("test title updated");
         expect(updatedPost.body).toEqual("we need to do a, b, c")
    });

    test("throws NotFound error if id Does Not Exist", async function () {
        try {
            await Post.update(0, {});
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }   
    });
});

describe("_postExists", function () {
    test("returns bool true if post exists", async function () {
        const grabPostId = await db.query(
            `SELECT id FROM posts WHERE title='test title'`);
        const { id } = grabPostId.rows[0];
        const check = await Post._postExists(id);
        expect(check).toEqual(true);
    });

    test("returns bool false if post DNE", async function() {
        const check = await Post._postExists(0);
        expect(check).toEqual(false);
    });
});

describe("deletePost", function () {
    test("works", async function () {
        const grabPostId = await db.query(
            `SELECT id FROM posts WHERE title='test title'`);
        const { id } = grabPostId.rows[0];
        await Post.deletePost(id);
        const res = await db.query(
            `SELECT * FROM users WHERE id=${id}`);
        expect(res.rows.length).toEqual(0);
    });

    test("throws NotFound if user DNE", async function () {
        try {
            await Post.deletePost(0);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }  
    });
});