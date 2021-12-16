"use strict";

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
      }
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
        street: 'UNDELIEVRABLE ST', 
        city: 'DNE town', 
        state: 'IX', 
        zip: 35, 
      }
      try {
          await EasyPostClient.verifyAddress(badAddress);
        fail();
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy();
      }
    });
  });