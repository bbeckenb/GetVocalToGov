const jwt = require('jsonwebtoken');
const JwtClient = require('./JwtClient');
const { SECRET_KEY } = require('../config');

describe('genAuthToken', () => {
  test('works with admin', () => {
    const testUser = { username: 'testUsername', isAdmin: true };
    const token = JwtClient.genAuthToken(testUser);
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      ...testUser,
    });
  });

  test('works with no admin', () => {
    const testUser = { username: 'testUsername', isAdmin: false };
    const token = JwtClient.genAuthToken(testUser);
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      ...testUser,
    });
  });
});
