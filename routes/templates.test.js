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

describe('POST /templates', () => {
  test('works, sets postId null if not present', async () => {
    const newTemplate = {
      title: 'test title 2',
      body: 'test template body 2',
    };
    const res = await request(app)
      .post('/templates')
      .set('authorization', `Bearer ${testUser0TokenAdmin}`)
      .send(newTemplate);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      template: {
        ...newTemplate,
        id: expect.any(Number),
        createdAt: expect.any(String),
        postId: null,
        userId: 'JDean1',
      },
    });
  });

  test('works, sets postId to actual id if parameter included', async () => {
    const grabPostId = await db.query('SELECT id FROM posts WHERE title=\'test title\'');
    const { id } = grabPostId.rows[0];
    const newTemplate = {
      title: 'test title 2',
      body: 'test template body 2',
      postId: id,
    };
    const res = await request(app)
      .post('/templates')
      .set('authorization', `Bearer ${testUser0TokenAdmin}`)
      .send(newTemplate);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      template: {
        ...newTemplate,
        id: expect.any(Number),
        userId: 'JDean1',
        createdAt: expect.any(String),
      },
    });
  });

  test('if no token unauth', async () => {
    const res = await request(app)
      .post('/templates');

    expect(res.statusCode).toEqual(401);
  });

  test('if all fields not filled in, bad request', async () => {
    const badTemplate = {
      link: 'https://kdvr.com/news/coronavirus/omicron-variant-case-confirmed-in-boulder-county/',
      body: 'we need to do q, r, s',
    };
    const res = await request(app)
      .post('/templates')
      .set('authorization', `Bearer ${testUser0TokenAdmin}`)
      .send(badTemplate);

    expect(res.statusCode).toEqual(400);
  });
});

describe('GET /templates', () => {
  test('retrieves all with no filter paramaters', async () => {
    const res = await request(app)
      .get('/templates')
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.body.templates.length).toEqual(3);
  });

  test('retrieves specified title', async () => {
    const res = await request(app)
      .get('/templates')
      .query({ title: 'header' })
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.body.templates.length).toEqual(1);
    expect(res.body.templates[0].title).toEqual('test header');
  });

  test('retrieves specified body', async () => {
    const res = await request(app)
      .get('/templates')
      .query({ body: 'specific inquiry' })
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.body.templates.length).toEqual(1);
    expect(res.body.templates[0].body).toEqual('very specific inquiry');
  });

  test('retrieves correctly with multiple filters', async () => {
    const res = await request(app)
      .get('/templates')
      .query({ title: 'test', body: 'DNE' })
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.body.templates.length).toEqual(0);
  });

  test('retrieves correctly with multiple filters', async () => {
    const res = await request(app)
      .get('/templates')
      .query({ title: 'title', body: '2' })
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.body.templates.length).toEqual(1);
    expect(res.body.templates[0].body).toEqual('test template body2');
  });
});

describe('GET /templates/:templateId', () => {
  test('works', async () => {
    const templateSearch = await db.query('SELECT id FROM templates WHERE title=\'test title\'');
    const { id } = templateSearch.rows[0];
    const res = await request(app)
      .get(`/templates/${id}`)
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      template: {
        id,
        title: 'test title',
        body: 'test template body',
        userId: 'JDean1',
        postId: expect.any(Number),
        createdAt: expect.any(String),
      },
    });
  });

  test('if no token unauth', async () => {
    const res = await request(app)
      .get('/templates/0');

    expect(res.statusCode).toEqual(401);
  });

  test('if template DNE, not found', async () => {
    const res = await request(app)
      .get('/templates/0')
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.statusCode).toEqual(404);
  });
});

describe('PATCH /templates/:templateId', () => {
  test('works', async () => {
    const templateSearch = await db.query('SELECT id FROM templates WHERE title=\'test title\'');
    const { id } = templateSearch.rows[0];

    const res = await request(app)
      .patch(`/templates/${id}`)
      .send({
        title: 'updated title',
        body: 'updated body',
      })
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      template: {
        id,
        title: 'updated title',
        body: 'updated body',
        userId: 'JDean1',
        postId: expect.any(Number),
        createdAt: expect.any(String),
      },
    });
  });

  test('if template DNE, not found', async () => {
    const res = await request(app)
      .patch('/templates/0')
      .send({
        title: 'updated title',
        body: 'updated body',
      })
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.statusCode).toEqual(404);
  });

  test('if user is not owner or admin, unauth', async () => {
    const templateSearch = await db.query('SELECT id FROM templates WHERE title=\'test title\'');
    const { id } = templateSearch.rows[0];

    const res = await request(app)
      .patch(`/templates/${id}`)
      .send({
        title: 'updated title',
        body: 'updated body',
      })
      .set('authorization', `Bearer ${testUser1TokenNonAdmin}`);

    expect(res.statusCode).toEqual(401);
  });

  test('if no token, unauth', async () => {
    const templateSearch = await db.query('SELECT id FROM templates WHERE title=\'test title\'');
    const { id } = templateSearch.rows[0];

    const res = await request(app)
      .patch(`/templates/${id}`);

    expect(res.statusCode).toEqual(401);
  });

  test('if all data not included bad request', async () => {
    const templateSearch = await db.query('SELECT id FROM templates WHERE title=\'test title\'');
    const { id } = templateSearch.rows[0];

    const res = await request(app)
      .patch(`/templates/${id}`)
      .send({
        body: 'updated body',
      })
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.statusCode).toEqual(400);
  });
});

describe('DELETE /templates/:templateId', () => {
  test('works', async () => {
    const templateSearch = await db.query('SELECT id FROM templates WHERE title=\'test title\'');
    const { id } = templateSearch.rows[0];
    const res = await request(app)
      .delete(`/templates/${id}`)
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      deleted: Number(id),
    });
  });

  test('if no token unauth', async () => {
    const res = await request(app)
      .delete('/templates/0');

    expect(res.statusCode).toEqual(401);
  });

  test('if template DNE, not found', async () => {
    const res = await request(app)
      .delete('/templates/0')
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.statusCode).toEqual(404);
  });

  test('if User does not have ownership of template Unauth', async () => {
    const templateToDelete = await db.query('SELECT id FROM templates WHERE title=\'test title\'');
    const { id } = templateToDelete.rows[0];
    const res = await request(app)
      .delete(`/templates/${id}`)
      .set('authorization', `Bearer ${testUser1TokenNonAdmin}`);

    expect(res.statusCode).toEqual(401);
  });
});
