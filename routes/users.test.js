/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app');
const db = require('../db');

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testUser0TokenAdmin,
  testUser1TokenNonAdmin,
} = require('./_testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe('GET /users/:username', () => {
  test('works', async () => {
    const res = await request(app)
      .get('/users/JDean1')
      .set('authorization', `Bearer ${testUser1TokenNonAdmin}`);

    expect(res.body).toEqual({
      user: {
        firstName: 'Jimmy',
        lastName: 'Dean',
        username: 'JDean1',
        password: expect.any(String),
        street: '2210 OCEANWALK DR W',
        city: 'ATLANTIC BEACH',
        state: 'FL',
        zip: '32233',
        email: 'jdean@gmail.com',
        isAdmin: true,
        favorites: expect.any(Array),
        bookmarks: expect.any(Array),
      },
    });
    expect(res.statusCode).toEqual(200);
  });

  test("sends unauth err if requestor doesn't have a valid token", async () => {
    const res = await request(app)
      .get('/users/JDean1');

    expect(res.statusCode).toEqual(401);
  });

  test('sends not found err if username not in db', async () => {
    const res = await request(app)
      .get('/users/wrongo')
      .set('authorization', `Bearer ${testUser1TokenNonAdmin}`);

    expect(res.statusCode).toEqual(404);
  });
});

describe('PATCH /users/:username', () => {
  test('works', async () => {
    const res = await request(app)
      .patch('/users/JDean1')
      .send({
        firstName: 'Jammy',
        lastName: 'Dane',
        username: 'JDean12',
        password: '1234',
        street: '60 Sierra Street',
        city: 'Calumet City',
        state: 'IL',
        zip: '60409',
        email: 'jdean@gmail.com',
      })
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.body).toEqual({
      user: {
        password: expect.any(String),
        firstName: 'Jammy',
        lastName: 'Dane',
        username: 'JDean12',
        street: '60 Sierra Street',
        city: 'Calumet City',
        state: 'IL',
        zip: '60409',
        email: 'jdean@gmail.com',
        isAdmin: true,
        favorites: expect.any(Array),
        bookmarks: expect.any(Array),
      },
    });

    expect(res.statusCode).toEqual(200);
  });

  test("sends unauth err if requestor doesn't have a valid token", async () => {
    const res = await request(app)
      .patch('/users/JDean1');

    expect(res.statusCode).toEqual(401);
  });

  test('sends unauth err if not same user or admin', async () => {
    const res = await request(app)
      .patch('/users/JDean1')
      .send({
        firstName: 'Jammy',
        lastName: 'Dane',
        username: 'JDean12',
        password: '1234',
        street: '60 Sierra Street',
        city: 'Calumet City',
        state: 'IL',
        zip: '60409',
        email: 'jdean1@gmail.com',
      })
      .set('authorization', `Bearer ${testUser1TokenNonAdmin}`);

    expect(res.statusCode).toEqual(401);
  });

  test("sends bad request err if data doesn't match jsonschema", async () => {
    const res = await request(app)
      .patch('/users/JDean1')
      .send({
        password: '1234',
        street: '60 Sierra Street',
        city: 'Calumet City',
        state: 'IL',
        zip: '60409',
        email: 'jdean@gmail.com',
        isAdmin: true,
      })
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.statusCode).toEqual(400);
  });
});

describe('DELETE /users/:username', () => {
  test('works', async () => {
    const res = await request(app)
      .delete('/users/JDean1')
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.body).toEqual({ deleted: 'JDean1' });
    expect(res.statusCode).toEqual(200);
  });

  test('sends unauth err if token does not match requested username for deletion', async () => {
    const res = await request(app)
      .delete('/users/JDean1')
      .set('authorization', `Bearer ${testUser1TokenNonAdmin}`);

    expect(res.statusCode).toEqual(401);
  });

  test('sends not found err if username DNE token does not match requested username for deletion', async () => {
    const res = await request(app)
      .delete('/users/wrongo')
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.statusCode).toEqual(404);
  });

  test('sends unauth if no token', async () => {
    const res = await request(app)
      .delete('/users/JDean1');

    expect(res.statusCode).toEqual(401);
  });
});

describe('POST /users/:username/templates/:templateId', () => {
  test('works', async () => {
    const username = 'JDean1';
    const grabTemplateId = await db.query(
      'SELECT id FROM templates WHERE title=\'test title\'',
    );
    const { id } = grabTemplateId.rows[0];
    const res = await request(app)
      .post(`/users/${username}/templates/${id}`)
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.body).toEqual({ favorited: id });
    expect(res.statusCode).toEqual(201);
  });

  test('throws not found if username DNE', async () => {
    const username = 'DNE';
    const grabTemplateId = await db.query(
      'SELECT id FROM templates WHERE title=\'test title\'',
    );
    const { id } = grabTemplateId.rows[0];
    const res = await request(app)
      .post(`/users/${username}/templates/${id}`)
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.statusCode).toEqual(404);
  });

  test('throws unauth if username does not match and is not admin', async () => {
    const username = 'DNE';
    const grabTemplateId = await db.query(
      'SELECT id FROM templates WHERE title=\'test title\'',
    );
    const { id } = grabTemplateId.rows[0];
    const res = await request(app)
      .post(`/users/${username}/templates/${id}`)
      .set('authorization', `Bearer ${testUser1TokenNonAdmin}`);

    expect(res.statusCode).toEqual(401);
  });

  test('throws not found if template ID DNE', async () => {
    const username = 'DNE';
    const id = 0;
    const res = await request(app)
      .post(`/users/${username}/templates/${id}`)
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.statusCode).toEqual(404);
  });

  test('throws bad req if favorite already exists', async () => {
    const username = 'JDean1';
    const grabTemplateId = await db.query(
      'SELECT id FROM templates WHERE title=\'test title\'',
    );
    const { id } = grabTemplateId.rows[1];
    const res = await request(app)
      .post(`/users/${username}/templates/${id}`)
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.statusCode).toEqual(400);
  });
});

describe('DELETE /users/:username/templates/:templateId', () => {
  test('works', async () => {
    const username = 'JDean1';
    const grabTemplateId = await db.query(
      'SELECT id FROM templates WHERE title=\'test title\'',
    );
    const { id } = grabTemplateId.rows[1];
    const res = await request(app)
      .delete(`/users/${username}/templates/${id}`)
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.body).toEqual({ unfavorited: id });
    expect(res.statusCode).toEqual(200);
  });

  test('throws unauth if not user or admin', async () => {
    const username = 'JDean1';
    const grabTemplateId = await db.query(
      'SELECT id FROM templates WHERE title=\'test title\'',
    );
    const { id } = grabTemplateId.rows[1];
    const res = await request(app)
      .delete(`/users/${username}/templates/${id}`)
      .set('authorization', `Bearer ${testUser1TokenNonAdmin}`);

    expect(res.statusCode).toEqual(401);
  });

  test('throws not found if favorite DNE', async () => {
    const username = 'JDean1';
    const grabTemplateId = await db.query(
      'SELECT id FROM templates WHERE title=\'test title\'',
    );
    const { id } = grabTemplateId.rows[0];
    const res = await request(app)
      .delete(`/users/${username}/templates/${id}`)
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.statusCode).toEqual(404);
  });

  test('throws not found if username DNE', async () => {
    const username = 'DNE';
    const grabTemplateId = await db.query(
      'SELECT id FROM templates WHERE title=\'test title\'',
    );
    const { id } = grabTemplateId.rows[0];
    const res = await request(app)
      .delete(`/users/${username}/templates/${id}`)
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.statusCode).toEqual(404);
  });

  test('throws not found if template id DNE', async () => {
    const username = 'DNE';
    const id = 0;
    const res = await request(app)
      .delete(`/users/${username}/templates/${id}`)
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.statusCode).toEqual(404);
  });
});

describe('POST /users/:username/posts/:postId', () => {
  test('works', async () => {
    const username = 'JDean1';
    const grabPostId = await db.query(
      'SELECT id FROM posts WHERE title=\'test title\'',
    );
    const { id } = grabPostId.rows[0];
    const res = await request(app)
      .post(`/users/${username}/posts/${id}`)
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.body).toEqual({ bookmarked: id });
    expect(res.statusCode).toEqual(201);
  });

  test('throws not found if username DNE', async () => {
    const username = 'DNE';
    const grabPostId = await db.query(
      'SELECT id FROM posts WHERE title=\'test title\'',
    );
    const { id } = grabPostId.rows[0];
    const res = await request(app)
      .post(`/users/${username}/posts/${id}`)
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.statusCode).toEqual(404);
  });

  test('throws unauth if username does not match and is not admin', async () => {
    const username = 'DNE';
    const grabPostId = await db.query(
      'SELECT id FROM posts WHERE title=\'test title\'',
    );
    const { id } = grabPostId.rows[0];
    const res = await request(app)
      .post(`/users/${username}/posts/${id}`)
      .set('authorization', `Bearer ${testUser1TokenNonAdmin}`);

    expect(res.statusCode).toEqual(401);
  });

  test('throws not found if post ID DNE', async () => {
    const username = 'DNE';
    const id = 0;
    const res = await request(app)
      .post(`/users/${username}/posts/${id}`)
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.statusCode).toEqual(404);
  });

  test('throws bad req if bookmark already exists', async () => {
    const username = 'JDean1';
    const grabPostId = await db.query(
      'SELECT id FROM posts WHERE title=\'test title 2\'',
    );
    const { id } = grabPostId.rows[0];
    const res = await request(app)
      .post(`/users/${username}/posts/${id}`)
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.statusCode).toEqual(400);
  });
});

describe('DELETE /users/:username/posts/:postId', () => {
  test('works', async () => {
    const username = 'JDean1';
    const grabPostId = await db.query(
      'SELECT id FROM posts WHERE title=\'test title 2\'',
    );
    const { id } = grabPostId.rows[0];
    const res = await request(app)
      .delete(`/users/${username}/posts/${id}`)
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.body).toEqual({ unbookmarked: id });
    expect(res.statusCode).toEqual(200);
  });

  test('throws unauth if not user or admin', async () => {
    const username = 'JDean1';
    const grabPostId = await db.query(
      'SELECT id FROM posts WHERE title=\'test title\'',
    );
    const { id } = grabPostId.rows[1];
    const res = await request(app)
      .delete(`/users/${username}/posts/${id}`)
      .set('authorization', `Bearer ${testUser1TokenNonAdmin}`);

    expect(res.statusCode).toEqual(401);
  });

  test('throws not found if favorite DNE', async () => {
    const username = 'JDean1';
    const grabPostId = await db.query(
      'SELECT id FROM posts WHERE title=\'test title\'',
    );
    const { id } = grabPostId.rows[0];
    const res = await request(app)
      .delete(`/users/${username}/posts/${id}`)
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.statusCode).toEqual(404);
  });

  test('throws not found if username DNE', async () => {
    const username = 'DNE';
    const grabPostId = await db.query(
      'SELECT id FROM posts WHERE title=\'test title\'',
    );
    const { id } = grabPostId.rows[0];
    const res = await request(app)
      .delete(`/users/${username}/posts/${id}`)
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.statusCode).toEqual(404);
  });

  test('throws not found if post id DNE', async () => {
    const username = 'DNE';
    const id = 0;
    const res = await request(app)
      .delete(`/users/${username}/posts/${id}`)
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.statusCode).toEqual(404);
  });
});


curl -X POST https://getvocaltogov.herokuapp.com/auth/token \
-H 'Content-Type: application/json' \
-d '{
      "username": "demoUser",
      "password": "passGood",
}'