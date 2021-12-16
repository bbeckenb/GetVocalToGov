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

describe('validateAddress', () => {
  test('works', async () => {
    const goodAddress = {
      street: '2210 oceanwalk dr w', 
      city: 'atlantic beach', 
      state: 'FL', 
      zip: '32233', 
    }
    const addressOut = await User.validateAddress(goodAddress);
    expect(addressOut).toEqual({
      street: '2210 OCEANWALK DR W', 
      city: 'ATLANTIC BEACH', 
      state: 'FL', 
      zip: '32233', 
    });
  });

  test('works', async () => {
    const badAddress = {
      street: 'UNDELIEVRABLE ST', 
      city: 'pp town', 
      state: 'IX', 
      zip: 35, 
    }
    try {
        await User.validateAddress(badAddress);
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
})
