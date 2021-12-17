const axios = require('axios');
require('dotenv').config();
const {
  BadRequestError,
} = require('../ExpressError');

class GoogleCivicClient {
  static async getRepresentatives({
    street, city, state, zip,
  }) {
    const googleApiKey = process.env.GOOGLE_API_KEY;
    const address = `${street} ${city} ${state} ${zip}`;
    const url = `https://www.googleapis.com/civicinfo/v2/representatives?key=${googleApiKey}&address=${address}`;
    try {
      const repData = await axios.get(url);
      // console.log(repData);
      return repData;
    } catch (err) {
      // console.log(err)
      throw new BadRequestError('Something went wrong getting User Representative Information:', err);
    }
  }
}

module.exports = GoogleCivicClient;
