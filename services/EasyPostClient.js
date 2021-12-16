const EasyPost = require('@easypost/api');
const { EasyPostClientLogger } = require('../logger');
require('dotenv').config();
const {
    BadRequestError,
  } = require('../ExpressError');

class EasyPostClient {
    constructor () {}

    static async verifyAddress({ street, city, state, zip }) {
        const easyPostApi = new EasyPost(process.env.EASY_POST_API_KEY);
        const res = await new easyPostApi.Address({
            verify: ['delivery'],
            street1: street,
            city: city,
            state: state,
            zip: zip,
            country: 'US'
          });
          try {
            await res.save();
            return { street: res.street1, 
                     city: res.city, 
                     state: res.state, 
                     zip: res.zip.substring(0,5) }
          } catch (err) {
            EasyPostClientLogger.error(`Error occurred verifying address:`, err.errors)
            throw new BadRequestError(`Something went wrong verifying User address: ${err.errors}`);
          }
      }
}

module.exports = EasyPostClient;