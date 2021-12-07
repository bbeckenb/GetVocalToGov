"use strict";

const db = require("../db");
const { PostModelLogger } = require("../logger");
const {
    BadRequestError, 
    NotFoundError
} = require("../ExpressError");

class Post {
    /* Post class scaffolding for Post ORM holds attributes Post (id, userId, link, title, body, timestamp, tag/s, location) */

    constructor({id, title, link, body, userId, tag, location}) {
        this.id = id;
        this.title = title;
        this.link = link;
        this.body = body;
        this.userId = userId;
        this.tag = tag;
        this.location = location;
      }

      static async _postExists(id) {
        const checkDbForId = await db.query(
            `SELECT id 
            FROM posts
            WHERE id = $1`,
            [id],
        );
        return checkDbForId.rows[0] ? true : false
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
        return new Post({id, title, link, body, userId, tag, location});
    }

    static async getPost(id) {
        const res = await db.query(
            `SELECT id,
                    title,
                    link,
                    body,
                    user_id AS "userId",
                    tag,
                    location
            FROM posts
            WHERE id = $1`, 
            [id]
        );
        const post = res.rows[0];
        if(!post) {
            throw new NotFoundError(`Post with id of ${id} Does Not Exist`)
        }
        return new Post(post);
    }

    static async update(id, data) {
        const postCheck = await Post._postExists(id);
        if(!postCheck) {
            PostModelLogger.error(`Post with id ${id} Not Found`)
            throw new NotFoundError(`Post with id ${id} Not Found`);
        }
        const { title, link, body, userId, tag, location } = data;
        try {
            await db.query(
                `UPDATE posts
                SET title = $1,
                    link = $2,
                    body = $3,
                    tag = $4,
                    location = $5
                WHERE id = $6`,
                [title, link, body, tag, location, id]
            );
            PostModelLogger.info(`Post with id ${id} updated`);
            return new Post({id, title, link, body, userId, tag, location})
        } catch (err) {
            PostModelLogger.error(`Error occurred updating Post with id ${id}: ${err}`)
            throw new BadRequestError(`Error occurred updating Post with id ${id}: ${err}`);
        }
    }

    static async deletePost(id) {
        const postCheck = await Post._postExists(id)
        if (!postCheck) {
            throw new NotFoundError(`Post with id ${id} Does Not Exist`);
        }
        await db.query(
            `DELETE FROM posts
            WHERE id = $1
        `, [id]);
        PostModelLogger.info(`Post with id ${id} Deleted`);
    }
}

module.exports = Post;

