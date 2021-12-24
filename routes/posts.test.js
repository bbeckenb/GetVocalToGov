/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app');

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testUser0TokenAdmin,
  testUser1TokenNonAdmin,
} = require('./_testCommon');
const db = require('../db');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe('POST /posts', () => {
  test('works', async () => {
    const newPost = {
      title: 'test title 2',
      link: 'https://kdvr.com/news/coronavirus/omicron-variant-case-confirmed-in-boulder-county/',
      body: 'we need to do q, r, s',
      tag: 'health care',
      location: 'FL',
      userId: 'JDean1',
    };
    const res = await request(app)
      .post('/posts')
      .set('authorization', `Bearer ${testUser0TokenAdmin}`)
      .send(newPost);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      post: {
        ...newPost,
        id: expect.any(Number),
        createdAt: expect.any(String),
      },
    });
  });

  test('if no token unauth', async () => {
    const res = await request(app)
      .post('/posts');

    expect(res.statusCode).toEqual(401);
  });

  test('if all fields not filled in, bad request', async () => {
    const badPost = {
      link: 'https://kdvr.com/news/coronavirus/omicron-variant-case-confirmed-in-boulder-county/',
      body: 'we need to do q, r, s',
      tag: 'health care',
      location: 'FL',
    };
    const res = await request(app)
      .post('/posts')
      .set('authorization', `Bearer ${testUser0TokenAdmin}`)
      .send(badPost);

    expect(res.statusCode).toEqual(400);
  });
});

describe('GET /posts/:postId', () => {
  test('works', async () => {
    const postSearch = await db.query('SELECT id FROM posts WHERE title=\'test title\'');
    const { id } = postSearch.rows[0];
    const res = await request(app)
      .get(`/posts/${id}`)
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.body).toEqual({
      post: {
        id: expect.any(Number),
        title: 'test title',
        link: 'https://kdvr.com/news/coronavirus/omicron-variant-case-confirmed-in-boulder-county/',
        body: 'we need to do x, y, z',
        userId: 'JDean1',
        tag: 'health care',
        location: 'CO',
      },
    });
    expect(res.statusCode).toEqual(200);
  });

  test('if no token unauth', async () => {
    const res = await request(app)
      .get('/posts/0');

    expect(res.statusCode).toEqual(401);
  });

  test('if post DNE NotFound', async () => {
    const res = await request(app)
      .get('/posts/0')
      .set('authorization', `Bearer ${testUser1TokenNonAdmin}`);

    expect(res.statusCode).toEqual(404);
  });
});

describe('PATCH /posts/:postId', () => {
  test('works', async () => {
    const postToUpdate = await db.query('SELECT id FROM posts WHERE title=\'test title\'');
    const { id } = postToUpdate.rows[0];
    const updatedPost = {
      title: 'test title updated',
      link: 'https://kdvr.com/news/coronavirus/omicron-variant-case-confirmed-in-boulder-county/',
      body: 'we need to do l, m, n',
      tag: 'health care',
      location: 'GA',
    };
    const res = await request(app)
      .patch(`/posts/${id}`)
      .set('authorization', `Bearer ${testUser0TokenAdmin}`)
      .send(updatedPost);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      post: {
        ...updatedPost,
        id: expect.any(Number),
        userId: 'JDean1',
      },
    });
  });

  test('no token unauth', async () => {
    const res = await request(app)
      .patch('/posts/0');

    expect(res.statusCode).toEqual(401);
  });

  test('no if User does not have ownership of post Unauth', async () => {
    const postToUpdate = await db.query('SELECT id FROM posts WHERE title=\'test title\'');
    const { id } = postToUpdate.rows[0];
    const updatedPost = {
      title: 'test title updated',
      link: 'https://kdvr.com/news/coronavirus/omicron-variant-case-confirmed-in-boulder-county/',
      body: 'we need to do l, m, n',
      tag: 'health care',
      location: 'GA',
    };
    const res = await request(app)
      .patch(`/posts/${id}`)
      .set('authorization', `Bearer ${testUser1TokenNonAdmin}`)
      .send(updatedPost);
    expect(res.statusCode).toEqual(401);
  });

  test('if post DNE NotFound', async () => {
    const updatedPost = {
      title: 'test title updated',
      link: 'https://kdvr.com/news/coronavirus/omicron-variant-case-confirmed-in-boulder-county/',
      body: 'we need to do l, m, n',
      tag: 'health care',
      location: 'GA',
    };
    const res = await request(app)
      .patch('/posts/0')
      .set('authorization', `Bearer ${testUser0TokenAdmin}`)
      .send(updatedPost);

    expect(res.statusCode).toEqual(404);
  });

  test('if all fields not filled in, bad request', async () => {
    const badPost = {
      link: 'https://kdvr.com/news/coronavirus/omicron-variant-case-confirmed-in-boulder-county/',
      body: 'we need to do q, r, s',
      tag: 'health care',
      location: 'FL',
    };
    const postToUpdate = await db.query('SELECT id FROM posts WHERE title=\'test title\'');
    const { id } = postToUpdate.rows[0];
    const res = await request(app)
      .patch(`/posts/${id}`)
      .set('authorization', `Bearer ${testUser0TokenAdmin}`)
      .send(badPost);

    expect(res.statusCode).toEqual(400);
  });
});

describe('DELETE /posts/:postId', () => {
  test('works', async () => {
    const postSearch = await db.query('SELECT id FROM posts WHERE title=\'test title\'');
    const { id } = postSearch.rows[0];
    const res = await request(app)
      .delete(`/posts/${id}`)
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ deleted: id });
  });

  test('if User does not have ownership of post Unauth', async () => {
    const postToDelete = await db.query('SELECT id FROM posts WHERE title=\'test title\'');
    const { id } = postToDelete.rows[0];
    const res = await request(app)
      .delete(`/posts/${id}`)
      .set('authorization', `Bearer ${testUser1TokenNonAdmin}`);

    expect(res.statusCode).toEqual(401);
  });

  test('if post DNE NotFound', async () => {
    const res = await request(app)
      .delete('/posts/0')
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.statusCode).toEqual(404);
  });

  test('no token unauth', async () => {
    const res = await request(app)
      .delete('/posts/0');

    expect(res.statusCode).toEqual(401);
  });
});
