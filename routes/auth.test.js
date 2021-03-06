/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app');

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

describe('POST /auth/token', () => {
  test('works', async () => {
    const res = await request(app)
      .post('/auth/token')
      .send({ username: 'JDean1', password: '1234' });
    expect(res.body).toEqual({
      token: expect.any(String),
    });
  });

  test('invalid user receives NotFound (see User Model)', async () => {
    const res = await request(app)
      .post('/auth/token')
      .send({ username: 'DNE', password: '1234' });
    expect(res.statusCode).toEqual(404);
  });

  test('invalid password receives unauth', async () => {
    const res = await request(app)
      .post('/auth/token')
      .send({ username: 'JDean1', password: 'wrong' });
    expect(res.statusCode).toEqual(401);
  });

  test('bad request with missing data receives 400', async () => {
    const res = await request(app)
      .post('/auth/token')
      .send({ username: 'JDean1' });
    expect(res.statusCode).toEqual(400);
  });
});

describe('POST /auth/register', () => {
  test('works', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        firstName: 'Teddy',
        lastName: 'Bear',
        username: 'TB12',
        password: '1234',
        street: '60 Sierra Street',
        city: 'Calumet City',
        state: 'IL',
        zip: '60409',
        county: 'Cook',
        email: 'tedbear@gmail.com',
        isAdmin: true,
      });
    expect(res.body).toEqual({ token: expect.any(String) });
    expect(res.statusCode).toEqual(201);
  });

  test('if all required data is not present, kicks back 400', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        username: 'TB12',
        password: '1234',
        street: '60 Sierra Street',
        city: 'Calumet City',
        state: 'IL',
        zip: '60409',
        county: 'Cook',
        email: 'tedbear@gmail.com',
        isAdmin: true,
      });
    expect(res.statusCode).toEqual(400);
  });
});
