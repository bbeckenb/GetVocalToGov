/* eslint-disable no-underscore-dangle */
const db = require('../db');
const { TemplateModelLogger } = require('../logger');
const {
  NotFoundError,
} = require('../ExpressError');

class Template {
  /* Template class scaffolding for Template ORM holds attributes
  Template (id, title, body, templateId, username) */

  constructor({
    id, title, body, postId, userId, createdAt,
  }) {
    this.id = Number(id);
    this.title = title;
    this.body = body;
    this.userId = userId;
    this.postId = postId;
    this.createdAt = createdAt;
  }

  static async _templateExists(id) {
    const checkDbForId = await db.query(
      `SELECT id 
            FROM templates
            WHERE id = $1`,
      [id],
    );
    return !!checkDbForId.rows[0];
  }

  static async create({
    title, body, postId = null, userId,
  }) {
    const result = await db.query(
      `INSERT INTO templates
            (title, body, post_id, user_id)                
                VALUES ($1, $2, $3, $4)
                RETURNING id, created_at AS "createdAt"`,
      [title, body, postId, userId],
    );

    const { id, createdAt } = result.rows[0];
    return new Template({
      id, title, body, postId, userId, createdAt,
    });
  }

  static async getAllOrFilterTemplates(filters = {}) {
    /* Filter criteria = title, body, tag, location */
    let queryString = 'SELECT id, title, body, created_at AS "createdAt", post_id AS "postId", user_id AS "userId" FROM templates';
    const {
      title, body,
    } = filters;
    // eslint-disable-next-line prefer-const
    let filterStatements = [];
    // eslint-disable-next-line prefer-const
    let queryVals = [];
    if (title !== undefined) {
      queryVals.push(`%${title}%`);
      filterStatements.push(`title ILIKE $${queryVals.length}`);
    }
    if (body !== undefined) {
      queryVals.push(`%${body}%`);
      filterStatements.push(`body ILIKE $${queryVals.length}`);
    }
    if (filterStatements.length > 0) {
      queryString += ` WHERE ${filterStatements.join(' AND ')}`;
    }
    queryString += ' ORDER BY created_at DESC';
    const res = await db.query(queryString, queryVals);
    return res.rows.map((template) => new Template(template));
  }

  static async getTemplate(id) {
    const res = await db.query(
      `SELECT id,
                    title,
                    body,
                    post_id AS "postId",
                    user_id AS "userId",
                    created_at AS "createdAt"
            FROM templates
            WHERE id = $1`,
      [id],
    );
    const template = res.rows[0];
    if (!template) {
      throw new NotFoundError(`Template with id of ${id} Does Not Exist`);
    }
    return new Template(template);
  }

  static async update(id, data) {
    const templateCheck = await Template._templateExists(id);
    if (!templateCheck) {
      TemplateModelLogger.error(`template with id ${id} Not Found`);
      throw new NotFoundError(`template with id ${id} Not Found`);
    }
    const { title, body } = data;

    const res = await db.query(
      `UPDATE templates
                SET title = $1,
                    body = $2
                WHERE id = $3
                RETURNING post_id AS "postId",
                          user_id AS "userId",
                          created_at AS "createdAt"`,
      [title, body, id],
    );
    const { postId, userId, createdAt } = res.rows[0];
    TemplateModelLogger.info(`template with id ${id} updated`);
    return new Template({
      id, title, body, postId, userId, createdAt,
    });
    // TemplateModelLogger.error(`Error occurred updating template with id ${id}: ${err}`);
    // throw new BadRequestError(`Error occurred updating template with id ${id}: ${err}`);
  }

  static async deleteTemplate(id) {
    const templateCheck = await Template._templateExists(id);
    if (!templateCheck) {
      throw new NotFoundError(`template with id ${id} Does Not Exist`);
    }
    await db.query(`DELETE FROM templates
            WHERE id = $1
        `, [id]);
    TemplateModelLogger.info(`template with id ${id} Deleted`);
  }

  stat;
}

module.exports = Template;
