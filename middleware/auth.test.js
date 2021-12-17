/* eslint-disable no-undef */
const db = require('../db');
const { UnauthorizedError } = require('../ExpressError');
const {
  authJWT,
  checkLoggedIn,
  checkCorrectUserOrAdmin,
  checkPostOwnerOrAdmin,
  checkTemplateOwnerOrAdmin,
} = require('./auth');
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  goodJWTnoAdmin,
  badJWT,
} = require('./_testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe('authJWT', () => {
  test('works through header', () => {
    const req = { headers: { authorization: `Bearer ${goodJWTnoAdmin}` } };
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authJWT(req, res, next);
    expect(res.locals).toEqual({
      user: {
        iat: expect.any(Number),
        username: 'test',
        isAdmin: false,
      },
    });
  });

  test('works with no header', () => {
    const req = {};
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authJWT(req, res, next);
    expect(res.locals).toEqual({});
  });

  test('works with bad token', () => {
    const req = { headers: { authorization: `Bearer ${badJWT}` } };
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authJWT(req, res, next);
    expect(res.locals).toEqual({});
  });
});

describe('checkLoggedIn', () => {
  test('works', () => {
    expect.assertions(1);
    const req = {};
    const res = { locals: { user: { username: 'test', isAdmin: false } } };
    const next = (err) => {
      expect(err).toBeFalsy();
    };
    checkLoggedIn(req, res, next);
  });

  test('unauth if user not logged in', () => {
    expect.assertions(1);
    const req = {};
    const res = { locals: {} };
    const next = (err) => {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    checkLoggedIn(req, res, next);
  });
});

describe('checkCorrectUserOrAdmin', () => {
  test('works for admin', () => {
    const req = { params: { username: 'test' } };
    const res = { locals: { user: { username: 'admin', isAdmin: true } } };
    const next = (err) => {
      expect(err).toBeFalsy();
    };
    checkCorrectUserOrAdmin(req, res, next);
  });

  test('works for correct user', () => {
    const req = { params: { username: 'test' } };
    const res = { locals: { user: { username: 'test', isAdmin: false } } };
    const next = (err) => {
      expect(err).toBeFalsy();
    };
    checkCorrectUserOrAdmin(req, res, next);
  });

  test('stops wrong user non admin', () => {
    const req = { params: { username: 'wrong' } };
    const res = { locals: { user: { username: 'test', isAdmin: false } } };
    const next = (err) => {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    checkCorrectUserOrAdmin(req, res, next);
  });
});

describe('checkPostOwnerOrAdmin', () => {
  test('works for user non admin', async () => {
    const postSearch = await db.query('SELECT id FROM posts WHERE title=\'test title\'');
    const { id } = postSearch.rows[0];
    const req = { params: { postId: id } };
    const res = { locals: { user: { username: 'JDean1', isAdmin: false } } };
    const next = (err) => {
      expect(err).toBeFalsy();
    };
    checkPostOwnerOrAdmin(req, res, next);
  });

  test('works for non owner admin', async () => {
    const postSearch = await db.query('SELECT id FROM posts WHERE title=\'test title\'');
    const { id } = postSearch.rows[0];
    const req = { params: { postId: id } };
    const res = { locals: { user: { username: 'adminGuy', isAdmin: true } } };
    const next = (err) => {
      expect(err).toBeFalsy();
    };
    checkPostOwnerOrAdmin(req, res, next);
  });

  test('not owner or admin, unauth', async () => {
    const postSearch = await db.query('SELECT id FROM posts WHERE title=\'test title\'');
    const { id } = postSearch.rows[0];
    const req = { params: { postId: id } };
    const res = { locals: { user: { username: 'badManTricksterGuy', isAdmin: false } } };
    const next = (err) => {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    checkPostOwnerOrAdmin(req, res, next);
  });
});

describe('checkTemplateOwnerOrAdmin', () => {
  test('works for user non admin', async () => {
    const templateSearch = await db.query('SELECT id FROM templates WHERE title=\'test title\'');
    const { id } = templateSearch.rows[0];
    const req = { params: { templateId: id } };
    const res = { locals: { user: { username: 'JDean1', isAdmin: false } } };
    const next = (err) => {
      expect(err).toBeFalsy();
    };
    checkTemplateOwnerOrAdmin(req, res, next);
  });

  test('works for non owner admin', async () => {
    const templateSearch = await db.query('SELECT id FROM templates WHERE title=\'test title\'');
    const { id } = templateSearch.rows[0];
    const req = { params: { templateId: id } };
    const res = { locals: { user: { username: 'adminGuy', isAdmin: true } } };
    const next = (err) => {
      expect(err).toBeFalsy();
    };
    checkTemplateOwnerOrAdmin(req, res, next);
  });

  test('not owner or admin, unauth', async () => {
    const templateSearch = await db.query('SELECT id FROM templates WHERE title=\'test title\'');
    const { id } = templateSearch.rows[0];
    const req = { params: { templateId: id } };
    const res = { locals: { user: { username: 'badManTricksterGuy', isAdmin: false } } };
    const next = (err) => {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    checkTemplateOwnerOrAdmin(req, res, next);
  });
});
