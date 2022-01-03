/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
const db = require('../db');
const User = require('./User');
const {
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
} = require('../ExpressError');
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

// test Basic Model
describe('check to see if basic User was stored in db from _testCommon', () => {
  test('model and register works', async () => {
    const testUser1 = {
      firstName: 'Jimmothy',
      lastName: 'Deanus',
      username: 'JDean12',
      password: '1234',
      street: '60 Sierra Street',
      city: 'Calumet City',
      state: 'IL',
      zip: '60409',
      county: 'Cook',
      email: 'jdean@gmail.com',
      isAdmin: true,
    };
    const res = await User.register(testUser1);
    expect(res).toBeInstanceOf(User);
    expect(res.firstName).toEqual('Jimmothy');
    expect(res.email).toEqual('jdean@gmail.com');
    expect(res.isAdmin).toEqual(true);
    expect(res.password.startsWith('$2b$')).toEqual(true);
  });
});

describe('authenticate', () => {
  test('works', async () => {
    // const users = await db.query('SELECT * FROM users');
    const user = await User.authenticate('JDean1', '1234');
    expect(user).toBeInstanceOf(User);
    expect(user.email).toEqual('jdean@gmail.com');
    expect(user.isAdmin).toEqual(true);
    expect(user.password.startsWith('$2b$')).toEqual(true);
  });

  test('throws Unauthorized error if pw is wrong', async () => {
    try {
      /* TestUser0 from _testCommon
            username:"JDean1",
            password:"1234",  */
      await User.authenticate('JDean1', '123WRONG');
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });

  test('throws NotFound error if username is invalid', async () => {
    try {
      /* TestUser0 from _testCommon
            username:"JDean1",
            password:"1234",  */
      await User.authenticate('WRONGO', '1234');
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe('update', () => {
  test('works', async () => {
    const updateData = {
      firstName: 'Jammy',
      lastName: 'Dane',
      username: 'JD1',
      password: '1234',
      street: '60 Sierra Street',
      city: 'Calumet City',
      state: 'IL',
      zip: '60409',
      county: 'Cook',
      email: 'jdean1@gmail.com',
      isAdmin: true,
    };
    const updatedUser = await User.update('JDean1', updateData);
    expect(updatedUser.firstName).toEqual('Jammy');
    expect(updatedUser.lastName).toEqual('Dane');
    expect(updatedUser.username).toEqual('JD1');
  });

  test('bypasses username manipulation if username remains the same', async () => {
    const updateData = {
      firstName: 'Jammy',
      lastName: 'Dane',
      username: 'JDean1',
      password: '1234',
      street: '60 Sierra Street',
      city: 'Calumet City',
      state: 'IL',
      zip: '60409',
      county: 'Cook',
      email: 'jdean1@gmail.com',
      isAdmin: true,
    };
    const updatedUser = await User.update('JDean1', updateData);
    expect(updatedUser.firstName).toEqual('Jammy');
    expect(updatedUser.lastName).toEqual('Dane');
    expect(updatedUser.username).toEqual('JDean1');
  });

  test('throws NotFound error if username is invalid', async () => {
    try {
      /* TestUser0 from _testCommon
            username:"JDean1",
            password:"1234",  */
      await User.update('WRONGO', {});
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test('throws Unauthorized error if pw is wrong', async () => {
    try {
      /* TestUser0 from _testCommon
            username:"JDean1",
            password:"1234",  */
      await User.update('JDean1', { password: 'WRONGO' });
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });
});

describe('_usernameExists', () => {
  test('returns bool true if username exists', async () => {
    // check existing test username
    const check = await User._usernameExists('JDean1');
    expect(check).toEqual(true);
  });

  test('returns bool false if username DNE', async () => {
    const check = await User._usernameExists('usernameDNE');
    expect(check).toEqual(false);
  });
});

describe('getUser', () => {
  test('returns User instance if username exists', async () => {
    const res = await User.getUser('JDean1');

    expect(res).toBeInstanceOf(User);
    expect(res.firstName).toEqual('Jimmy');
    expect(res.email).toEqual('jdean@gmail.com');
    expect(res.isAdmin).toEqual(true);
    expect(res.password.startsWith('$2b$')).toEqual(true);
  });

  test('NotFound error if username DNE', async () => {
    try {
      /* TestUser0 from _testCommon
            username:"JDean1",
            password:"1234",  */
      await User.getUser('WRONGO');
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe('deleteUser', () => {
  test('works', async () => {
    await User.deleteUser('JDean1');
    const res = await db.query(
      "SELECT * FROM users WHERE username='JDean1'",
    );
    expect(res.rows.length).toEqual(0);
  });

  test('throws NotFound if user DNE', async () => {
    try {
      /* TestUser0 from _testCommon
            username:"JDean1",
            password:"1234",  */
      await User.deleteUser('WRONGO');
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe('userDataChecks', () => {
  test('works', async () => {
    const goodData = {
      street: '2210 OCEANWALK DR W',
      city: 'ATLANTIC BEACH',
      state: 'FL',
      zip: '32233',
      username: 'newUsername',
    };
    const dataOut = await User.userDataChecks(goodData);
    expect(dataOut).toEqual({
      street: '2210 OCEANWALK DR W',
      city: 'ATLANTIC BEACH',
      state: 'FL',
      zip: '32233',
    });
  });

  test('bad address Bad Req', async () => {
    /* With the way tests are set up, a user is
    registered each test, this is throttling the EasyPost API
    Therefore this integration test is not effective.
    The EasyPostClient test file validates it function when called however */
    const badData = {
      street: '2210 OCEANWALK DR W',
      city: 'ATLANTIC BEACH',
      state: 'FL',
      zip: '32233',
      username: 'JDean1',
    };
    try {
      await User.userDataChecks(badData);
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });

  test('username exists Bad Req', async () => {
    const badData = {
      street: '2210 OCEANWALK DR W',
      city: 'ATLANTIC BEACH',
      state: 'FL',
      zip: '32233',
      username: 'JDean1',
    };
    try {
      await User.userDataChecks(badData);
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });

  test('bypasses username check if input boolean is false', async () => {
    const usernameExists = {
      street: '2210 OCEANWALK DR W',
      city: 'ATLANTIC BEACH',
      state: 'FL',
      zip: '32233',
      username: 'JDean1',
    };
    const dataOut = await User.userDataChecks(usernameExists, false);
    expect(dataOut).toEqual({
      street: '2210 OCEANWALK DR W',
      city: 'ATLANTIC BEACH',
      state: 'FL',
      zip: '32233',
    });
  });
});

describe('_favoriteExists', () => {
  test('provides bool false if favorite DNE', async () => {
    const username = 'JDean1';
    const grabTemplateId = await db.query(
      'SELECT id FROM templates WHERE title=\'test title\'',
    );
    const { id } = grabTemplateId.rows[0];
    const output = await User._favoriteExists(username, id);
    expect(output).toEqual(false);
  });

  test('provides bool true if favorite exists', async () => {
    const username = 'JDean1';
    const grabTemplateId = await db.query(
      'SELECT id FROM templates WHERE title=\'test title\'',
    );
    const { id } = grabTemplateId.rows[0];
    await User.addFavorite(username, id);
    const output = await User._favoriteExists(username, id);
    expect(output).toEqual(true);
  });

  test('throws Not Found if username DNE', async () => {
    const username = 'DNE';
    const grabTemplateId = await db.query(
      'SELECT id FROM templates WHERE title=\'test title\'',
    );
    const { id } = grabTemplateId.rows[0];
    try {
      await User._favoriteExists(username, id);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test('throws Not Found if template DNE', async () => {
    const username = 'JDean1';
    const id = 0;
    try {
      await User._favoriteExists(username, id);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe('addFavorite', () => {
  test('works', async () => {
    const username = 'JDean1';
    const grabTemplateId = await db.query(
      'SELECT id FROM templates WHERE title=\'test title\'',
    );
    const { id } = grabTemplateId.rows[0];
    const output = await User.addFavorite(username, id);
    expect(output).toEqual(expect.any(Number));
  });

  test('throws bad req if favorite already exists', async () => {
    const username = 'JDean1';
    const grabTemplateId = await db.query(
      'SELECT id FROM templates WHERE title=\'test title\'',
    );
    const { id } = grabTemplateId.rows[0];
    await User.addFavorite(username, id);
    try {
      await User.addFavorite(username, id);
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });

  test('throws Not Found if username DNE', async () => {
    const username = 'DNE';
    const grabTemplateId = await db.query(
      'SELECT id FROM templates WHERE title=\'test title\'',
    );
    const { id } = grabTemplateId.rows[0];
    try {
      await User.addFavorite(username, id);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe('removeFavorite', () => {
  test('works', async () => {
    const username = 'JDean1';
    const grabTemplateId = await db.query(
      'SELECT id FROM templates WHERE title=\'test title\'',
    );
    const { id } = grabTemplateId.rows[0];
    await User.addFavorite(username, id);
    const output = await User.removeFavorite(username, id);
    expect(output).toEqual(expect.any(Number));
  });

  test('throws Not Found if favorite DNE', async () => {
    const username = 'DNE';
    const grabTemplateId = await db.query(
      'SELECT id FROM templates WHERE title=\'test title\'',
    );
    const { id } = grabTemplateId.rows[0];
    try {
      await User.removeFavorite(username, id);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe('_postExists', () => {
  test('provides bool false if bookmark DNE', async () => {
    const username = 'JDean1';
    const grabPostId = await db.query(
      'SELECT id FROM posts WHERE title=\'test title\'',
    );
    const { id } = grabPostId.rows[0];
    const output = await User._bookmarkExists(username, id);
    expect(output).toEqual(false);
  });

  test('provides bool true if bookmark exists', async () => {
    const username = 'JDean1';
    const grabPostId = await db.query(
      'SELECT id FROM posts WHERE title=\'test title\'',
    );
    const { id } = grabPostId.rows[0];
    await User.addBookmark(username, id);
    const output = await User._bookmarkExists(username, id);
    expect(output).toEqual(true);
  });

  test('throws Not Found if username DNE', async () => {
    const username = 'DNE';
    const grabPostId = await db.query(
      'SELECT id FROM posts WHERE title=\'test title\'',
    );
    const { id } = grabPostId.rows[0];
    try {
      await User._bookmarkExists(username, id);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test('throws Not Found if template DNE', async () => {
    const username = 'JDean1';
    const id = 0;
    try {
      await User._bookmarkExists(username, id);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe('addBookmark', () => {
  test('works', async () => {
    const username = 'JDean1';
    const grabPostId = await db.query(
      'SELECT id FROM posts WHERE title=\'test title\'',
    );
    const { id } = grabPostId.rows[0];
    const output = await User.addBookmark(username, id);
    expect(output).toEqual(expect.any(Number));
  });

  test('throws bad req if bookmark already exists', async () => {
    const username = 'JDean1';
    const grabPostId = await db.query(
      'SELECT id FROM posts WHERE title=\'test title\'',
    );
    const { id } = grabPostId.rows[0];
    await User.addBookmark(username, id);
    try {
      await User.addBookmark(username, id);
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });

  test('throws Not Found if username DNE', async () => {
    const username = 'DNE';
    const grabPostId = await db.query(
      'SELECT id FROM posts WHERE title=\'test title\'',
    );
    const { id } = grabPostId.rows[0];
    try {
      await User.addBookmark(username, id);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe('removeBookmark', () => {
  test('works', async () => {
    const username = 'JDean1';
    const grabPostId = await db.query(
      'SELECT id FROM posts WHERE title=\'test title\'',
    );
    const { id } = grabPostId.rows[0];
    await User.addBookmark(username, id);
    const output = await User.removeBookmark(username, id);
    expect(output).toEqual(expect.any(Number));
  });

  test('throws Not Found if bookmark DNE', async () => {
    const username = 'DNE';
    const grabPostId = await db.query(
      'SELECT id FROM posts WHERE title=\'test title\'',
    );
    const { id } = grabPostId.rows[0];
    try {
      await User.removeBookmark(username, id);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe('retrieveFavorites', () => {
  test('provides empty array for user with no favorites', async () => {
    const username = 'JDean1';
    const output = await User.retrieveFavorites(username);
    expect(output).toEqual([]);
  });

  test('provides array with template ids of favorited templates', async () => {
    const username = 'JDean1';
    const grabTemplateId = await db.query(
      'SELECT id FROM templates WHERE title=\'test title\'',
    );
    const { id } = grabTemplateId.rows[0];
    await User.addFavorite(username, id);
    const output = await User.retrieveFavorites(username);
    expect(output).toEqual([id]);
  });
});

describe('retrieveBookmarks', () => {
  test('provides empty array for user with no bookmarks', async () => {
    const username = 'JDean1';
    const output = await User.retrieveBookmarks(username);
    expect(output).toEqual([]);
  });

  test('provides array with IDs of bookmarked posts', async () => {
    const username = 'JDean1';
    const grabPostId = await db.query(
      'SELECT id FROM posts WHERE title=\'test title\'',
    );
    const { id } = grabPostId.rows[0];
    await User.addBookmark(username, id);
    const output = await User.retrieveBookmarks(username);
    expect(output).toEqual([id]);
  });
});
