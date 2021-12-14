"use strict";

const db = require("../db");
const { TemplateModelLogger } = require("../logger");
const {
    BadRequestError, 
    NotFoundError
} = require("../ExpressError");

class Template {
    /* Template class scaffolding for Template ORM holds attributes Template (id, title, body, templateId, username) */

    constructor({ id, title, body, postId, userId }) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.userId = userId;
        this.postId = postId || null;
    }

    static async _templateExists(id) {
        const checkDbForId = await db.query(
            `SELECT id 
            FROM templates
            WHERE id = $1`,
            [id],
        );
        return checkDbForId.rows[0] ? true : false
    }

    static async create({ title, body }) {
        const result = await db.query(
            `INSERT INTO templates
            (title, body)                
                VALUES ($1, $2)
                RETURNING id`,
                [title, body]
        );

        const { id } = result.rows[0];
        return new Template({ id, title, body });
    }

    static async getTemplate(id) {
        const res = await db.query(
            `SELECT id,
                    title,
                    body
            FROM templates
            WHERE id = $1`, 
            [id]
        );
        const template = res.rows[0];
        if(!template) {
            throw new NotFoundError(`Template with id of ${id} Does Not Exist`)
        }
        return new Template(template);
    }

    static async update(id, data) {
        const templateCheck = await Template._templateExists(id);
        if(!templateCheck) {
            TemplateModelLogger.error(`template with id ${id} Not Found`)
            throw new NotFoundError(`template with id ${id} Not Found`);
        }
        const { title, body } = data;
        try {
            await db.query(
                `UPDATE templates
                SET title = $1,
                    body = $2
                WHERE id = $3`,
                [title, body, id]
            );
            TemplateModelLogger.info(`template with id ${id} updated`);
            return new Template({id, title, body})
        } catch (err) {
            TemplateModelLogger.error(`Error occurred updating template with id ${id}: ${err}`)
            throw new BadRequestError(`Error occurred updating template with id ${id}: ${err}`);
        }
    }

    static async deleteTemplate(id) {
        const templateCheck = await Template._templateExists(id)
        if (!templateCheck) {
            throw new NotFoundError(`template with id ${id} Does Not Exist`);
        }
        await db.query(
            `DELETE FROM templates
            WHERE id = $1
        `, [id]);
        TemplateModelLogger.info(`template with id ${id} Deleted`);
    }

    stat
}


module.exports = Template;

