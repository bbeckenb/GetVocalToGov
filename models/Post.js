"use strict";

const db = require("../db");
const {
    BadRequestError
} = require("../ExpressError");

class Post {
    /* Post class scaffolding for Post ORM holds attributes Post (id, userId, link, title, body, timestamp, tag/s, location) */

    constructor(id, title, link, body, username, tag, location) {
        this.id = id;
        this.title = title;
        this.link = link;
        this.body = body;
        this.username = username;
        this.tag = tag;
        this.location = location;
      }

    static async create({ title, link, body, username, tag, location }) {
        const result = await db.query(
            `INSERT INTO posts
            (
                title, 
                link, 
                body, 
                username, 
                tag,
                location)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id`,
                [title, link, body, username, tag, location]
        );

        let { id } = result.rows[0];
        return new Post(id, title, link, body, username, tag, location);
    }

}


module.exports = Post;

