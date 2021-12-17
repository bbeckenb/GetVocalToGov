/* eslint-disable no-undef */
const GoogleCivicClient = require('./GoogleCivicClient');
const {
  BadRequestError,
} = require('../ExpressError');

describe('getRepresentatives', () => {
  test('works', async () => {
    const goodAddress = {
      street: '2210 OCEANWALK DR W',
      city: 'ATLANTIC BEACH',
      state: 'FL',
      zip: '32233',
    };
    const addressOut = await GoogleCivicClient.getRepresentatives(goodAddress);
    expect(addressOut.status).toEqual(200);
  });

  test('bad address throws bad req', async () => {
    const badAddress = {
      street: 'Meh',
      city: '',
      state: 'F',
      zip: '3',
    };
    try {
      await GoogleCivicClient.getRepresentatives(badAddress);
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});
