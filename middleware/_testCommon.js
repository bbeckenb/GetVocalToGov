const jwt = require('jsonwebtoken');
const db = require('../db');
const { SECRET_KEY } = require('../config');
const User = require('../models/User');
const Post = require('../models/Post');
const Template = require('../models/Template');

async function commonBeforeAll() {
  await db.query('DELETE FROM users');
  await db.query('DELETE FROM posts');
  await db.query('DELETE FROM templates');

  const testUser0Data = {
    firstName: 'Jimmy',
    lastName: 'Dean',
    username: 'JDean1',
    password: '1234',
    address: 'my house',
    email: 'jdean@gmail.com',
    isAdmin: true,
  };
  const testUser0 = await User.register(testUser0Data);

  const testPost0Data = {
    title: 'test title',
    link: 'https://kdvr.com/news/coronavirus/omicron-variant-case-confirmed-in-boulder-county/',
    body: 'we need to do x, y, z',
    userId: testUser0.username,
    tag: 'health care',
    location: 'CO',
  };
  const testPost0 = await Post.create(testPost0Data);

  const testTemplate0Data = {
    title: 'test title',
    body: 'test template body',
    userId: 'JDean1',
    postId: testPost0.id,
  };
  await Template.create(testTemplate0Data);
}

async function commonBeforeEach() {
  await db.query('BEGIN');
}

async function commonAfterEach() {
  await db.query('ROLLBACK');
}

async function commonAfterAll() {
  await db.end();
}

const goodJWTwithAdmin = jwt.sign({ username: 'test', isAdmin: true }, SECRET_KEY);
const goodJWTnoAdmin = jwt.sign({ username: 'test', isAdmin: false }, SECRET_KEY);
const badJWT = jwt.sign({ username: 'test', isAdmin: true }, 'bad_key');

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  goodJWTnoAdmin,
  goodJWTwithAdmin,
  badJWT,
};
