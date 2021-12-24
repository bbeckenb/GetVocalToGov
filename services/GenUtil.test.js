/* eslint-disable no-undef */
const GenUtil = require('./GenUtil');

describe('prettyPrintDate', () => {
  test('works', () => {
    const outputDate = GenUtil.prettyPrintDate('2021-12-23T22:45:16.421Z');
    expect(outputDate).toEqual('Thursday, December 23rd, 2021, 5:45:16 PM');
  });
});
