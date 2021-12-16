/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const db = require('../db');
const EasyPostClient = require('../services/EasyPostClient');
const { UserModelLogger } = require('../logger');
const { BCRYPT_WORK_FACTOR } = require('../config');
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require('../ExpressError');

class User {
  /* User class scaffolding for User ORM holds attributes
  User (username, password, firstName, lastName, street, city, state, zip, email, isAdmin) */
  constructor({
    username, password, firstName, lastName, street, city, state, zip, email, isAdmin,
  }) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.street = street;
    this.city = city;
    this.state = state;
    this.zip = zip;
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
    return checkDbForUsername.rows[0] !== undefined;
  }

  static async register(data) {
    const { username, password, firstName, lastName, email, isAdmin } = data;
    const { street, city, state, zip } = await User.userDataChecks(data);
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    try {
      await db.query(
        `INSERT INTO users
                (first_name, last_name, username, password, email, is_admin, street, city, state, zip)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [firstName, lastName, username, hashedPassword, email, isAdmin, street, city, state, zip],
      );
      UserModelLogger.info(`New User ${username} created`);
      return new User({
        firstName, lastName, username, password: hashedPassword, email, isAdmin, street, city, state, zip
      });
    } catch (err) {
      UserModelLogger.error(`Error occurred registering new user: ${err}`);
      throw new BadRequestError(`Something went wrong while you were registering: ${err}`);
    }
  }

  static async authenticate(username, password) {
    const user = await User.getUser(username);
    if (user) {
      // if username exists, all data will be returned
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch === true) {
        return new User(user);
      }
    }
    // else it must be a wrong username or password
    UserModelLogger.error('Error occurred authenticating user');
    throw new UnauthorizedError('Invalid username or password');
  }

  static async update(heldUsername, data) {
    /* setting this up for form entry, all fields will be auto-filled except password.
    All fields can be adjusted, password will be used to authorize change */
    const { username, password, firstName, lastName, email, isAdmin } = data;
    const { street, city, state, zip } = await User.userDataChecks(data);
    // use authenticate to ensure User who is requesting update is aware of required password
    const authorizedUser = await User.authenticate(heldUsername, password);
    try {
      await db.query(
        `UPDATE users
                SET first_name = $1, 
                    last_name = $2, 
                    username = $3, 
                    email = $4, 
                    is_admin = $5,
                    street = $6, 
                    city = $7, 
                    state = $8, 
                    zip = $9 
                WHERE username = $10`,
        [firstName, lastName, username, email, isAdmin, street, city, state, zip, heldUsername],
      );
      UserModelLogger.info(`User ${heldUsername} updated`);
      return new User({
        firstName, lastName, username, password: authorizedUser.password, email, isAdmin, street, city, state, zip
      });
    } catch (err) {
      UserModelLogger.error(`Error occurred updating User: ${err}`);
      throw new BadRequestError(`Something went wrong while updating User: ${err}`);
    }
  }

  static async getUser(username) {
    const userCheck = await User._usernameExists(username);
    if (!userCheck) {
      throw new NotFoundError(`${username} Does Not Exist`);
    }
    const res = await db.query(
      `SELECT first_name AS "firstName", 
                    last_name AS "lastName", 
                    username, 
                    password, 
                    email, 
                    is_admin AS "isAdmin",
                    street, 
                    city, 
                    state, 
                    zip
            FROM users
            WHERE username = $1`,
      [username],
    );
    const user = res.rows[0];
    return new User(user);
  }

  static async deleteUser(username) {
    const userCheck = await User._usernameExists(username);
    if (!userCheck) {
      throw new NotFoundError(`${username} Does Not Exist`);
    }
    await db.query(`DELETE FROM users
            WHERE username = $1
        `, [username]);
    UserModelLogger.info(`${username} Deleted`);
  }

  static async userDataChecks(data) {
    const { username } = data;
    if (await User._usernameExists(username)) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }
    const verifiedAddress = await EasyPostClient.verifyAddress(data);
    return verifiedAddress
  }
}

module.exports = User;
