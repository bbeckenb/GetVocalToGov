"use strict";

const db = require("../db");
const { PostModelLogger } = require("../logger");
const {
    BadRequestError
} = require("../ExpressError");

class Post {
    /* Post class scaffolding for Post ORM holds attributes Post (id, userId, link, title, body, timestamp, tag/s, location) */

    constructor(id, title, link, body, userId, tag, location) {
        this.id = id;
        this.title = title;
        this.link = link;
        this.body = body;
        this.userId = userId;
        this.tag = tag;
        this.location = location;
      }

    static async create({ title, link, body, userId, tag, location }) {
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
                RETURNING id`,
                [title, link, body, userId, tag, location]
        );
        let { id } = result.rows[0];
        PostModelLogger.info(`New Post ${id} created`);
        return new Post(id, title, link, body, userId, tag, location);
    }

}


module.exports = Post;

