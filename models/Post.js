/* eslint-disable no-underscore-dangle */
const db = require('../db');
const { PostModelLogger } = require('../logger');
const {
  NotFoundError,
} = require('../ExpressError');

class Post {
  /* Post class scaffolding for Post ORM holds attributes
  Post (id, userId, link, title, body, timestamp, tag/s, location) */

  constructor({
    id, title, link, body, userId, tag, location, createdAt, templates = [],
  }) {
    this.id = Number(id);
    this.title = title;
    this.link = link;
    this.body = body;
    this.userId = userId;
    this.tag = tag;
    this.location = location;
    this.createdAt = createdAt;
    this.templates = templates;
  }

  static async _postExists(id) {
    const checkDbForId = await db.query(
      `SELECT id 
            FROM posts
            WHERE id = $1`,
      [id],
    );
    return !!checkDbForId.rows[0];
  }

  static async create({
    title, link, body, userId, tag, location,
  }) {
    const result = await db.query(
      `INSERT INTO posts
            (
                title, 
                link, 
                body, 
                user_id, 
                tag,
                location)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id, created_at AS "createdAt"`,
      [title, link, body, userId, tag, location],
    );
    const { id, createdAt } = result.rows[0];
    PostModelLogger.info(`New Post ${id} created`);
    return new Post({
      id, title, link, body, userId, tag, location, createdAt,
    });
  }

  static async getAllOrFilterPosts(filters = {}) {
    /* Filter criteria = title, body, tag, location */
    let queryString = 'SELECT id, title, link, body, user_id AS "userId", tag, location, created_at AS "createdAt" FROM posts';
    const {
      title, body, tag, location,
    } = filters;
    // eslint-disable-next-line prefer-const
    let filterStatements = [];
    // eslint-disable-next-line prefer-const
    let queryVals = [];
    if (title) {
      queryVals.push(`%${title}%`);
      filterStatements.push(`title ILIKE $${queryVals.length}`);
    }
    if (body !== undefined) {
      queryVals.push(`%${body}%`);
      filterStatements.push(`body ILIKE $${queryVals.length}`);
    }
    if (tag !== undefined) {
      queryVals.push(tag);
      filterStatements.push(`tag=$${queryVals.length}`);
    }
    if (location !== undefined) {
      queryVals.push(location);
      filterStatements.push(`location=$${queryVals.length}`);
    }
    if (filterStatements.length > 0) {
      queryString += ` WHERE ${filterStatements.join(' AND ')}`;
    }
    queryString += ' ORDER BY created_at DESC';
    const res = await db.query(queryString, queryVals);
    return res.rows.map((post) => new Post(post));
  }

  static async getPost(id) {
    const res = await db.query(
      `SELECT id,
                    title,
                    link,
                    body,
                    user_id AS "userId",
                    tag,
                    location,
                    created_at AS "createdAt"
            FROM posts
            WHERE id = $1`,
      [id],
    );
    const post = res.rows[0];
    if (post === undefined) {
      throw new NotFoundError(`Post with id of ${id} Does Not Exist`);
    }
    const postTemplates = await db.query(
      `SELECT id, title, body, user_id AS "userId", created_at AS "createdAt", post_id AS "postId"
      FROM templates
      WHERE post_id=$1`,
      [id],
    );
    post.templates = postTemplates.rows;
    return new Post(post);
  }

  static async update(id, data) {
    const postCheck = await Post._postExists(id);
    if (!postCheck) {
      PostModelLogger.error(`Post with id ${id} Not Found`);
      throw new NotFoundError(`Post with id ${id} Not Found`);
    }
    const {
      title, link, body, tag, location,
    } = data;
    const res = await db.query(
      `UPDATE posts
                SET title = $1,
                    link = $2,
                    body = $3,
                    tag = $4,
                    location = $5
                WHERE id = $6
                RETURNING user_id AS "userId", created_at AS createdAt`,
      [title, link, body, tag, location, id],
    );
    const { userId, createdAt } = res.rows[0];
    PostModelLogger.info(`Post with id ${id} updated`);
    return new Post({
      id, title, link, body, userId, tag, location, createdAt,
    });
    // PostModelLogger.error(`Error occurred updating Post with id ${id}: ${err}`);
    // throw new BadRequestError(`Error occurred updating Post with id ${id}: ${err}`);
  }

  static async deletePost(id) {
    const postCheck = await Post._postExists(id);
    if (!postCheck) {
      throw new NotFoundError(`Post with id ${id} Does Not Exist`);
    }
    await db.query(`DELETE FROM posts
            WHERE id = $1
        `, [id]);
    PostModelLogger.info(`Post with id ${id} Deleted`);
  }
}

module.exports = Post;
