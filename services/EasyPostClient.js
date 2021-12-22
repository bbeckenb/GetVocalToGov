const EasyPost = require('@easypost/api');
const { EasyPostClientLogger } = require('../logger');
require('dotenv').config();
const {
  BadRequestError,
} = require('../ExpressError');

class EasyPostClient {
  static async verifyAddress({
    street, city, state, zip,
  }) {
    const easyPostKey = process.env.NODE_ENV === 'test' ? process.env.EASY_POST_API_TEST_KEY : process.env.EASY_POST_API_KEY;
    const api = new EasyPost(easyPostKey);
    const address = new api.Address({
      verify: ['delivery'],
      street1: street,
      city,
      state,
      zip,
      country: 'US',
    });
    await address.save();
    const { delivery } = address.verifications;
    if (delivery.success) {
      return {
        street: address.street1,
        city: address.city,
        state: address.state,
        zip: address.zip.substring(0, 5),
      };
    }
    const errs = delivery.errors.map((e) => e.message);
    EasyPostClientLogger.error(`Something went wrong verifying User address: ${errs}`);
    throw new BadRequestError(`Something went wrong verifying User address: ${errs}`);
  }
}

module.exports = EasyPostClient;
