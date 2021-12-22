/* eslint-disable no-underscore-dangle */
const db = require('../db');
const { TemplateModelLogger } = require('../logger');
const {
  BadRequestError,
  NotFoundError,
} = require('../ExpressError');

class Template {
  /* Template class scaffolding for Template ORM holds attributes
  Template (id, title, body, templateId, username) */

  constructor({
    id, title, body, postId, userId,
  }) {
    this.id = Number(id);
    this.title = title;
    this.body = body;
    this.userId = userId;
    this.postId = postId;
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
                RETURNING id`,
      [title, body, postId, userId],
    );

    const { id } = result.rows[0];
    return new Template({
      id, title, body, postId, userId,
    });
  }

  static async getTemplate(id) {
    const res = await db.query(
      `SELECT id,
                    title,
                    body,
                    post_id AS "postId",
                    user_id AS "userId"
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
                          user_id AS "userId"`,
      [title, body, id],
    );
    const { postId, userId } = res.rows[0];
    TemplateModelLogger.info(`template with id ${id} updated`);
    return new Template({
      id, title, body, postId, userId,
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
