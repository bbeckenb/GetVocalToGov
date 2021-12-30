const db = require('../db');
const User = require('./User');
const Post = require('./Post');
const Template = require('./Template');

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

  const testPost0Data = {
    title: 'test title',
    link: 'https://kdvr.com/news/coronavirus/omicron-variant-case-confirmed-in-boulder-county/',
    body: 'we need to do x, y, z',
    userId: testUser0.username,
    tag: 'health care',
    location: 'CO',
  };
  const testPost0 = await Post.create(testPost0Data);

  const testPost1Data = {
    title: 'test title 2',
    link: 'https://kdvr.com/news/coronavirus/omicron-variant-case-confirmed-in-boulder-county/',
    body: 'we need to do x, y, z',
    userId: testUser0.username,
    tag: 'health care',
    location: 'FL',
  };
  await Post.create(testPost1Data);

  const testPost2Data = {
    title: 'test title search',
    link: 'https://kdvr.com/news/coronavirus/omicron-variant-case-confirmed-in-boulder-county/',
    body: 'we need to do x, y, z',
    userId: testUser0.username,
    tag: 'environment',
    location: 'AZ',
  };
  await Post.create(testPost2Data);

  const testPost3Data = {
    title: 'test title',
    link: 'https://kdvr.com/news/coronavirus/omicron-variant-case-confirmed-in-boulder-county/',
    body: 'very specific inquiry',
    userId: testUser0.username,
    tag: 'defense',
    location: 'CO',
  };
  await Post.create(testPost3Data);

  const testTemplate0Data = {
    title: 'test title',
    body: 'test template body',
    userId: 'JDean1',
    postId: testPost0.id,
  };
  await Template.create(testTemplate0Data);

  const testTemplate1Data = {
    title: 'test title',
    body: 'test template body2',
    userId: 'JDean1',
    postId: testPost0.id,
  };
  await Template.create(testTemplate1Data);

  const testTemplate2Data = {
    title: 'test header',
    body: 'very specific inquiry',
    userId: 'JDean1',
    postId: testPost0.id,
  };
  await Template.create(testTemplate2Data);
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

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
};
