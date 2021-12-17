const request = require('supertest');
const app = require('../app');
const GoogleCivicClient = require('../services/GoogleCivicClient');

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require('../expressError');
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

describe('GET /representatives/:username', () => {
  test('works', async () => {
    const res = await request(app)
      .get(`/representatives/JDean1`)
      .set('authorization', `Bearer ${testUser0TokenAdmin}`);

    expect(res.statusCode).toEqual(200);
    // console.log(res.body)
    expect(res.body.representatives).toBeDefined();
  });

  test('if no token unauth', async () => {
    const res = await request(app)
      .get('/representatives/JDean1');

    expect(res.statusCode).toEqual(401);
  });

  test('if user requesting rep info is not specified user or admin', async () => {
    const res = await request(app)
      .get('/representatives/JDean1')
      .set('authorization', `Bearer ${testUser1TokenNonAdmin}`);
    expect(res.statusCode).toEqual(401);
  });
});



