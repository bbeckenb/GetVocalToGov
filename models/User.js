"use strict";

const db = require("../db");
const { UserModelLogger } = require("../logger");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../ExpressError");

class User {
    /* User class scaffolding for User ORM holds attributes (firstName, lastName, username, pw, address) */
    constructor({ username, password, firstName, lastName, address, email, isAdmin }) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.email = email;
        this.isAdmin = isAdmin;
    }
    
    static async _usernameExists(username) {
        const checkDbForUsername = await db.query(
            `SELECT username 
            FROM users
            WHERE username = $1`,
            [username],
        );
        return checkDbForUsername.rows[0] ? true : false
    }

    static async register({ firstName, lastName, username, password, address, email, isAdmin }) {
        if (await User._usernameExists(username)) {
            throw new BadRequestError(`Duplicate username: ${username}`);
        }
        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
        try {
            const res = await db.query(
                `INSERT INTO users
                (first_name, last_name, username, password, address, email, is_admin)
                VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [firstName, lastName, username, hashedPassword, address, email, isAdmin]
            );
            UserModelLogger.info(`New User ${username} created`);
            const { id } = res.rows[0];
            return new User({ firstName, lastName, username, password: hashedPassword, address, email, isAdmin }); 
        } catch (err) {
            UserModelLogger.error(`Error occurred registering new user: ${err}`)
            throw new BadRequestError(`Something went wrong while you were registering: ${err}`);
        }
    }

    static async authenticate(username, password) {       
        const user = await User.getUser(username);
        if (user) {
            //if username exists, all data will be returned 
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch === true) {
                return new User(user); 
            }
        }
        //else it must be a wrong username or password 
        UserModelLogger.error(`Error occurred authenticating user`)
        throw new UnauthorizedError("Invalid username or password");
    }

    static async update(heldUsername, data) {
        //setting this up for form entry, all fields will be auto-filled except password. All fields can be adjusted, password will be used to authorize change
        const { username, firstName, lastName, password, address, email, isAdmin } = data;      
        //use authenticate to ensure User who is requesting update is aware of required password
        const authorizedUser = await User.authenticate(heldUsername, password);
        try {
            const res = await db.query(
                `UPDATE users
                SET first_name = $1, 
                    last_name = $2, 
                    username = $3, 
                    address = $4, 
                    email = $5, 
                    is_admin = $6
                WHERE username = $7`,
                [ firstName, lastName, username, address, email, isAdmin, heldUsername]
            );
            UserModelLogger.info(`User ${heldUsername} updated`)
            return new User({ firstName, lastName, username, password: authorizedUser.password, address, email, isAdmin }); 
        } catch (err) {
            UserModelLogger.error(`Error occurred updating User: ${err}`)
            throw new BadRequestError(`Something went wrong while updating User: ${err}`);
        }
    }

    static async getUser(username) {
        const userCheck = await User._usernameExists(username)
        if (!userCheck) {
            throw new NotFoundError(`${username} Does Not Exist`);
        }
        const res = await db.query(
            `SELECT id,
                    first_name AS "firstName", 
                    last_name AS "lastName", 
                    username, 
                    password, 
                    address, 
                    email, 
                    is_admin AS "isAdmin"
            FROM users
            WHERE username = $1`, 
            [username]
        );
        const user = res.rows[0];
        return new User(user);
    }

    static async deleteUser(username) {
        const userCheck = await User._usernameExists(username)
        if (!userCheck) {
            throw new NotFoundError(`${username} Does Not Exist`);
        }
        await db.query(
            `DELETE FROM users
            WHERE username = $1
        `, [username]);
        UserModelLogger.info(`${username} Deleted`);
    }
}

module.exports = User;

