/* eslint-disable no-undef */
const EasyPostClient = require('./EasyPostClient');
const {
  BadRequestError,
} = require('../ExpressError');

describe('verifyAddress', () => {
  test('works', async () => {
    const goodAddress = {
      street: '2210 oceanwalk dr w',
      city: 'atlantic beach',
      state: 'FL',
      zip: '32233',
    };
    const addressOut = await EasyPostClient.verifyAddress(goodAddress);
    expect(addressOut).toEqual({
      street: '2210 OCEANWALK DR W',
      city: 'ATLANTIC BEACH',
      state: 'FL',
      zip: '32233',
    });
  });

  test('bad address Bad Req', async () => {
    const badAddress = {
      street: 'pp town 2',
      city: 'butt city',
      state: 'fl',
      zip: '3456',
    };
    try {
      let output = await EasyPostClient.verifyAddress(badAddress);
      console.log(output)
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});
