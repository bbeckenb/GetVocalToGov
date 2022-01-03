/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const db = require('../db');
const EasyPostClient = require('../services/EasyPostClient');
const Template = require('./Template');
const Post = require('./Post');
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
    username,
    password,
    firstName,
    lastName,
    street, city,
    state,
    zip,
    email,
    isAdmin,
    favorites = [],
    bookmarks = [],
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
    this.favorites = favorites;
    this.bookmarks = bookmarks;
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
    const {
      username, password, firstName, lastName, email, isAdmin,
    } = data;
    const {
      street, city, state, zip,
    } = await User.userDataChecks(data);
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    await db.query(
      `INSERT INTO users
                (first_name, last_name, username, password, email, is_admin, street, city, state, zip)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [firstName, lastName, username, hashedPassword, email, isAdmin, street, city, state, zip],
    );
    UserModelLogger.info(`New User ${username} created`);
    return new User({
      firstName,
      lastName,
      username,
      password: hashedPassword,
      email,
      isAdmin,
      street,
      city,
      state,
      zip,
    });
    // UserModelLogger.error(`Error occurred registering new user: ${err}`);
    // throw new BadRequestError(`Something went wrong while you were registering: ${err}`);
  }

  static async authenticate(username, password) {
    const user = await User.getUser(username);
    if (user) {
      // if username exists, all data will be returned
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch === true) {
        UserModelLogger.info(`User, ${user.username} authenticated`);
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
    const {
      username, password, firstName, lastName, email, isAdmin,
    } = data;
    const {
      street, city, state, zip,
    } = await User.userDataChecks(data);
    // use authenticate to ensure User who is requesting update is aware of required password
    const authorizedUser = await User.authenticate(heldUsername, password);

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
    const favorites = await User.retrieveFavorites(username);
    const bookmarks = await User.retrieveBookmarks(username);
    return new User({
      firstName,
      lastName,
      username,
      password: authorizedUser.password,
      email,
      isAdmin,
      street,
      city,
      state,
      zip,
      favorites,
      bookmarks,
    });
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
    user.favorites = await User.retrieveFavorites(username);
    user.bookmarks = await User.retrieveBookmarks(username);
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

  static async userDataChecks(data, userCheck = true) {
    const {
      username, street, city, state, zip,
    } = data;
    if (userCheck && await User._usernameExists(username)) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }
    let verifiedAddress;
    if (process.env.NODE_ENV === 'test') {
      verifiedAddress = {
        street, city, state, zip,
      };
    } else {
      verifiedAddress = await EasyPostClient.verifyAddress(data);
    }
    return verifiedAddress;
  }

  static async _favoriteExists(username, tId) {
    const userCheck = await User._usernameExists(username);
    if (!userCheck) {
      throw new NotFoundError(`${username} Does Not Exist`);
    }
    const templateCheck = await Template._templateExists(tId);
    if (!templateCheck) {
      throw new NotFoundError(`template with id ${tId} Not Found`);
    }
    const checkDbForFavorite = await db.query(
      `SELECT user_id AS "userId", template_id AS "templateId" 
            FROM favorites
            WHERE user_id = $1
            AND template_id = $2`,
      [username, tId],
    );
    return checkDbForFavorite.rows[0] !== undefined;
  }

  static async addFavorite(username, tId) {
    const favCheck = await User._favoriteExists(username, tId);
    if (favCheck) {
      throw new BadRequestError(`${username} already favorited this template`);
    }
    const newFavorite = await db.query(
      `INSERT INTO favorites (user_id, template_id)
      VALUES ($1, $2)
      RETURNING template_id AS "templateId"`,
      [username, tId],
    );
    const { templateId } = newFavorite.rows[0];
    return templateId;
  }

  static async removeFavorite(username, tId) {
    const favCheck = await User._favoriteExists(username, tId);
    if (!favCheck) {
      throw new NotFoundError(`${username} cannot unfavorite this template because this record does not exist in the database`);
    }
    const removeFavorite = await db.query(
      `DELETE FROM favorites
      WHERE user_id = $1 AND template_id = $2
      RETURNING template_id AS "templateId"`,
      [username, tId],
    );
    const { templateId } = removeFavorite.rows[0];
    return templateId;
  }

  static async _bookmarkExists(username, pId) {
    const userCheck = await User._usernameExists(username);
    if (!userCheck) {
      throw new NotFoundError(`${username} Does Not Exist`);
    }
    const postCheck = await Post._postExists(pId);
    if (!postCheck) {
      throw new NotFoundError(`post with id ${pId} Not Found`);
    }
    const checkDbForBookmark = await db.query(
      `SELECT user_id AS "userId", post_id AS "postId" 
            FROM bookmarks
            WHERE user_id = $1
            AND post_id = $2`,
      [username, pId],
    );
    return checkDbForBookmark.rows[0] !== undefined;
  }

  static async addBookmark(username, pId) {
    const bmCheck = await User._bookmarkExists(username, pId);
    if (bmCheck) {
      throw new BadRequestError(`${username} already bookmarked this post`);
    }
    const newBookmark = await db.query(
      `INSERT INTO bookmarks (user_id, post_id)
      VALUES ($1, $2)
      RETURNING post_id AS "postId"`,
      [username, pId],
    );
    const { postId } = newBookmark.rows[0];
    return postId;
  }

  static async removeBookmark(username, pId) {
    const bmCheck = await User._bookmarkExists(username, pId);
    if (!bmCheck) {
      throw new NotFoundError(`${username} cannot unbookmark this post because this record does not exist in the database`);
    }
    const removeBookmark = await db.query(
      `DELETE FROM bookmarks
      WHERE user_id = $1 AND post_id = $2
      RETURNING post_id AS "postId"`,
      [username, pId],
    );
    const { postId } = removeBookmark.rows[0];
    return postId;
  }

  static async retrieveFavorites(username) {
    const userFavRes = await db.query(
      `SELECT template_id AS "templateId"
      FROM favorites
      WHERE user_id = $1
      ORDER BY created_at DESC`,
      [username],
    );
    return userFavRes.rows.map((fav) => fav.templateId);
  }

  static async retrieveBookmarks(username) {
    const userBmRes = await db.query(
      `SELECT post_id AS "postId"
      FROM bookmarks
      WHERE user_id = $1
      ORDER BY created_at DESC`,
      [username],
    );
    return userBmRes.rows.map((bm) => bm.postId);
  }
}

module.exports = User;
