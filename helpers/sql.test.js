const { sqlForPartialUpdate } = require("./sql");
const { BadRequestError } = require("../expressError");
const { commonAfterAll } = require("../models/_testCommon")

process.env.NODE_ENV !== "test"
afterAll(commonAfterAll);

describe("sqlForPartialUpdate", function () {
  test("works", function () {
    const params = {
        firstName: "first_name",
        lastName: "last_name",
        isAdmin: "is_admin",
      }
    const data = { email:"barbara@barb.com" };
    const outcome = sqlForPartialUpdate(data, params);
    expect(outcome).toEqual({
        setCols: "\"email\"=$1",
        values: ["barbara@barb.com"]
    });
  });

  test("no data, throw 400", function () {
    try {
      const data = {};
      const params = {};
      sqlForPartialUpdate(data, params);
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  })
});
