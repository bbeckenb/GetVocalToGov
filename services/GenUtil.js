const dateFormat = require('dateformat');

class GenUtil {
  static prettyPrintDate(dateString) {
    // "2021-12-23T22:45:16.421Z"
    const sqlDate = new Date(dateString);
    const outputDate = dateFormat(sqlDate, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
    return outputDate;
  }
}

module.exports = GenUtil;
