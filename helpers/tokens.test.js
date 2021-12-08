const jwt = require("jsonwebtoken");
const { genAuthToken } = require("./tokens");
const { SECRET_KEY } = require("../config");

describe("genAuthToken", function () {
    test("works with admin", function () {
        const testUser = {username: 'testUsername', isAdmin: true};
        const token = genAuthToken(testUser);
        const payload = jwt.verify(token, SECRET_KEY);
        expect(payload).toEqual({
            iat: expect.any(Number),
            ...testUser
        });
    });

    test("works with no admin", function () {
        const testUser = {username: 'testUsername', isAdmin: false};
        const token = genAuthToken(testUser);
        const payload = jwt.verify(token, SECRET_KEY);
        expect(payload).toEqual({
            iat: expect.any(Number),
            ...testUser
        });
    });
});