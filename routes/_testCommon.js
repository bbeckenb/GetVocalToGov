"use strict";

const db = require("../db");
const User = require("../models/User");
const Post = require("../models/Post");
const Template = require("../models/Template");
const { genAuthToken } = require("../helpers/tokens");

async function commonBeforeAll() {
    await db.query("DELETE FROM users;");
    await db.query("DELETE FROM posts;");
    await db.query("DELETE FROM templates;");

    const testUser0Data = {
                        firstName:"Jimmy", 
                        lastName:"Dean", 
                        username:"JDean1", 
                        password:"1234", 
                        address:"my house", 
                        email:"jdean@gmail.com", 
                        isAdmin:true,
                     }
    const testUser0 = await User.register(testUser0Data)

    const testUser1Data = {
        firstName:"Jane", 
        lastName:"Dean", 
        username:"JDean2", 
        password:"1234", 
        address:"my house", 
        email:"jdean2@gmail.com", 
        isAdmin:false,
     }
const testUser1 = await User.register(testUser1Data)

    const testPost0 = {
        title: "test title", 
        link:"https://kdvr.com/news/coronavirus/omicron-variant-case-confirmed-in-boulder-county/", 
        body: "we need to do x, y, z", 
        userId: testUser0.id, 
        tag: "health care", 
        location: "CO"
     }
     await Post.create(testPost0);

     const testTemplate0 = {
        title: "test title", 
        body: "test template body"
     }
     await Template.create(testTemplate0);
};


async function commonBeforeEach() {
    await db.query("BEGIN");
}

async function commonAfterEach() {
    await db.query("ROLLBACK");
}

async function commonAfterAll() {
    await db.end();
}

const testUser0TokenAdmin = genAuthToken({ username: "JDean1", isAdmin: true });
const testUser1TokenNonAdmin = genAuthToken({ username: "JDean2", isAdmin: false });

module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testUser0TokenAdmin,
    testUser1TokenNonAdmin
};

