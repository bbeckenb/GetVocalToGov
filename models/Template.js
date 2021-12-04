"use strict";

const db = require("../db");
const {
    BadRequestError
} = require("../ExpressError");

class Template {
    /* Template class scaffolding for Template ORM holds attributes Template (id, title, body, postId, username) */

    constructor(id, title, body) {
        this.id = id;
        this.title = title;
        this.body = body;
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
        return new Template(id, title, body);
    }

}


module.exports = Template;

