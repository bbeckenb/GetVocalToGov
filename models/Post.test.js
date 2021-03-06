/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const db = require('../db');
const Post = require('./Post');
const {
  NotFoundError,
} = require('../ExpressError');
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require('./_testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

// test Basic Model
describe('check to see if basic Post can be created', () => {
  test('model and create works', async () => {
    // retrieve testUser0 from db
    const testUserQuery = await db.query('SELECT username FROM users');
    const { username } = testUserQuery.rows[0];

    const testPost1 = {
      title: 'test title',
      link: 'https://kdvr.com/news/coronavirus/omicron-variant-case-confirmed-in-boulder-county/',
      body: 'we need to do x, y, z',
      userId: username,
      tag: 'Health Care',
      location: 'CO',
    };

    const res = await Post.create(testPost1);
    expect(res).toBeInstanceOf(Post);
    expect(res.userId).toEqual(username);
    expect(res.id).toEqual(expect.any(Number));
    expect(res.title).toEqual('test title');
    expect(res.tag).toEqual('Health Care');
  });
});

describe('getPost', () => {
  test('returns Post instance if id exists in db', async () => {
    const grabPostId = await db.query(
      "SELECT id FROM posts WHERE title='test title'",
    );
    const { id } = grabPostId.rows[0];
    const res = await Post.getPost(id);
    expect(res).toBeInstanceOf(Post);
    expect(res.id).toEqual(expect.any(Number));
    expect(res.body).toEqual('we need to do x, y, z');
    expect(res.userId).toEqual(expect.any(String));
  });

  test('returns NotFound if post id DNE', async () => {
    try {
      await Post.getPost(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe('update', () => {
  test('works', async () => {
    const grabPostId = await db.query(
      'SELECT id, user_id AS "userId" FROM posts WHERE title=\'test title\'',
    );
    const { id } = grabPostId.rows[0];
    const updateData = {
      title: 'test title updated',
      link: 'https://kdvr.com/news/coronavirus/omicron-variant-case-confirmed-in-boulder-county/',
      body: 'we need to do a, b, c',
      tag: 'Health Care',
      location: 'CO',
    };
    const updatedPost = await Post.update(id, updateData);
    expect(updatedPost).toBeInstanceOf(Post);
    expect(updatedPost.title).toEqual('test title updated');
    expect(updatedPost.body).toEqual('we need to do a, b, c');
    expect(updatedPost.id).toEqual(expect.any(Number));
    expect(updatedPost.userId).toEqual(expect.any(String));
  });

  test('throws NotFound error if id Does Not Exist', async () => {
    try {
      await Post.update(0, {});
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe('_postExists', () => {
  test('returns bool true if post exists', async () => {
    const grabPostId = await db.query(
      'SELECT id FROM posts WHERE title=\'test title\'',
    );
    const { id } = grabPostId.rows[0];
    const check = await Post._postExists(id);
    expect(check).toEqual(true);
  });

  test('returns bool false if post DNE', async () => {
    const check = await Post._postExists(0);
    expect(check).toEqual(false);
  });
});

describe('deletePost', () => {
  test('works', async () => {
    const grabPostId = await db.query(
      'SELECT id FROM posts WHERE title=\'test title\'',
    );
    const { id } = grabPostId.rows[0];
    await Post.deletePost(id);
    const res = await db.query(
      `SELECT * FROM posts WHERE id=${id}`,
    );
    expect(res.rows.length).toEqual(0);
  });

  test('throws NotFound if user DNE', async () => {
    try {
      await Post.deletePost(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe('getAllOrFilterPosts', () => {
  test('retrieves all with no filter criteria', async () => {
    const res = await Post.getAllOrFilterPosts();
    expect(res.length).toEqual(4);
  });

  test('retrieves specified title', async () => {
    const res = await Post.getAllOrFilterPosts({ title: 'title search' });
    expect(res.length).toEqual(1);
    expect(res[0]).toBeInstanceOf(Post);
    expect(res[0].title).toEqual('test title search');
  });

  test('retrieves specified body', async () => {
    const res = await Post.getAllOrFilterPosts({ body: 'specific inquiry' });
    expect(res.length).toEqual(1);
    expect(res[0]).toBeInstanceOf(Post);
    expect(res[0].body).toEqual('very specific inquiry');
  });

  test('retrieves specified tag', async () => {
    const res = await Post.getAllOrFilterPosts({ tag: 'Health Care' });
    expect(res.length).toEqual(2);
    expect(res[0]).toBeInstanceOf(Post);
    expect(res[1].title).toEqual('test title');
  });

  test('retrieves specified location', async () => {
    const res = await Post.getAllOrFilterPosts({ location: 'CO' });
    expect(res.length).toEqual(2);
    expect(res[0]).toBeInstanceOf(Post);
    expect(res[1].tag).toEqual('Health Care');
  });

  test('retrieves correctly with multiple filters', async () => {
    const res = await Post.getAllOrFilterPosts({ location: 'CO', tag: 'Environment' });
    expect(res.length).toEqual(0);
  });

  test('retrieves correctly with multiple filters', async () => {
    const res = await Post.getAllOrFilterPosts({ location: 'CO', tag: 'Health Care' });
    expect(res.length).toEqual(1);
    expect(res[0]).toBeInstanceOf(Post);
  });
});
