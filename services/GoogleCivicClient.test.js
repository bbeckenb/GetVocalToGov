"use strict";

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
      }
      const addressOut = await GoogleCivicClient.getRepresentatives(goodAddress);
      console.log(addressOut);
    });
  
});