const db = require('../db');
const User = require('../models/User');
const Post = require('../models/Post');
const Template = require('../models/Template');
const JwtClient = require('../services/JwtClient');

async function commonBeforeAll() {
  await db.query('DELETE FROM users');
  await db.query('DELETE FROM posts');
  await db.query('DELETE FROM templates');

  const testUser0Data = {
    firstName: 'Jimmy',
    lastName: 'Dean',
    username: 'JDean1',
    password: '1234',
    street: '2210 OCEANWALK DR W',
    city: 'ATLANTIC BEACH',
    state: 'FL',
    zip: '32233',
    email: 'jdean@gmail.com',
    isAdmin: true,
  };
  const testUser0 = await User.register(testUser0Data);

  const testUser1Data = {
    firstName: 'Jane',
    lastName: 'Dean',
    username: 'JDean2',
    password: '1234',
    street: '2210 OCEANWALK DR W',
    city: 'ATLANTIC BEACH',
    state: 'FL',
    zip: '32233',
    email: 'jdean2@gmail.com',
    isAdmin: false,
  };
  await User.register(testUser1Data);

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

const testUser0TokenAdmin = JwtClient.genAuthToken({ username: 'JDean1', isAdmin: true });
const testUser1TokenNonAdmin = JwtClient.genAuthToken({ username: 'JDean2', isAdmin: false });

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testUser0TokenAdmin,
  testUser1TokenNonAdmin,
};
