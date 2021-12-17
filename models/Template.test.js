/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const db = require('../db');
const Template = require('./Template');
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
describe('check to see if basic Template can be created', () => {
  test('model and create works', async () => {
    const testTemplate1 = {
      title: 'test title',
      body: 'we need to do x, y, z',
      userId: 'JDean1',
    };

    const res = await Template.create(testTemplate1);
    expect(res).toBeInstanceOf(Template);
    expect(res.id).toEqual(expect.any(Number));
    expect(res.title).toEqual('test title');
    expect(res.body).toEqual('we need to do x, y, z');
    expect(res.userId).toEqual('JDean1');
    expect(res.postId).toEqual(null);
  });
});

describe('_templateExists', () => {
  test('returns bool true if template exists', async () => {
    const grabtemplateId = await db.query(
      'SELECT id FROM templates WHERE title=\'test title\'',
    );
    const { id } = grabtemplateId.rows[0];
    const check = await Template._templateExists(id);
    expect(check).toEqual(true);
  });

  test('returns bool false if template DNE', async () => {
    const check = await Template._templateExists(0);
    expect(check).toEqual(false);
  });
});

describe('getTemplate', () => {
  test('returns Template instance if id exists in db', async () => {
    const grabTemplateId = await db.query(
      'SELECT id FROM templates WHERE title=\'test title\'',
    );
    const { id } = grabTemplateId.rows[0];
    const res = await Template.getTemplate(id);
    expect(res).toBeInstanceOf(Template);
    expect(res.id).toEqual(expect.any(Number));
    expect(res.body).toEqual('test template body');
  });

  test('returns NotFound if Template id DNE', async () => {
    try {
      await Template.getTemplate(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe('update', () => {
  test('works', async () => {
    const grabtemplateId = await db.query(
      'SELECT id FROM templates WHERE title=\'test title\'',
    );
    const { id } = grabtemplateId.rows[0];
    const updateData = {
      title: 'test title updated',
      body: 'body updated',
    };
    const updatedtemplate = await Template.update(id, updateData);
    expect(updatedtemplate).toBeInstanceOf(Template);
    expect(updatedtemplate.title).toEqual('test title updated');
    expect(updatedtemplate.body).toEqual('body updated');
    expect(updatedtemplate.postId).toEqual(expect.any(Number));
    expect(updatedtemplate.userId).toEqual('JDean1');
  });

  test('throws NotFound error if id Does Not Exist', async () => {
    try {
      await Template.update(0, {});
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe('deleteTemplate', () => {
  test('works', async () => {
    const grabTemplateId = await db.query(
      'SELECT id FROM templates WHERE title=\'test title\'',
    );
    const { id } = grabTemplateId.rows[0];
    await Template.deleteTemplate(id);
    const res = await db.query(
      `SELECT * FROM templates WHERE id=${id}`,
    );
    expect(res.rows.length).toEqual(0);
  });

  test('throws NotFound if user DNE', async () => {
    try {
      await Template.deleteTemplate(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
