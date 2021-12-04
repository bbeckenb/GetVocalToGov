"use strict";

const db = require("../db");
const {
    BadRequestError
} = require("../ExpressError");

class User {
    /* User class scaffolding for User ORM holds attributes (firstName, lastName, username, pw, address) */
    constructor(firstName, lastName, username, password, address, email, isAdmin) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.address = address;
        this.email = email;
        this.isAdmin = isAdmin;
      }

static async register({ firstName, lastName, username, password, address, email, isAdmin }) {
    const duplicateCheck = await db.query(
        `SELECT username 
        FROM users
        WHERE username = $1`,
        [username],
    );

    if (duplicateCheck.rows[0]) {
        throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const result = await db.query(
        `INSERT INTO users
        (
            first_name,
            last_name,
            username,
            password,
            address,
            email,
            is_admin)
            VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [
                firstName,
                lastName,
                username,
                password,
                address,
                email,
                isAdmin
            ]
    );

    return new User(firstName, lastName, username, password, address, email, isAdmin);
}

}


module.exports = User;

