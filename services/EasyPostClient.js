const EasyPost = require('@easypost/api');
const { EasyPostClientLogger } = require('../logger');
require('dotenv').config();
const {
    BadRequestError,
} = require('../ExpressError');

class EasyPostClient {
    static async verifyAddress({ street, city, state, zip }) {
        const easyPostKey = process.env.NODE_ENV === 'test' ? process.env.EASY_POST_API_TEST_KEY : process.env.EASY_POST_API_KEY;
        const api = new EasyPost(easyPostKey);
        const address = new api.Address({
          verify: ['delivery'],
          street1: street,
          city: city,
          state: state,
          zip: zip,
          country: 'US'
        });        
        try {
          await address.save();
          return { 
                    street: address.street1, 
                    city: address.city, 
                    state: address.state, 
                    zip: address.zip.substring(0,5) }
        } catch (err) {
          console.log(err)
          throw new BadRequestError(`Something went wrong verifying User address:`, err);
        }
    }
}


module.exports = EasyPostClient;