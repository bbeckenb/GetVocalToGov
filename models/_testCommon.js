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
    street: '60 Sierra Street', 
    city: 'Calumet City', 
    state: 'IL', 
    zip: '60409', 
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

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
};
