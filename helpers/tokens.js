const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

function genAuthToken(user) {
  const payload = {
    username: user.username,
    isAdmin: user.isAdmin,
  };

  return jwt.sign(payload, SECRET_KEY);
}

module.exports = { genAuthToken };
