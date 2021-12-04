const db = require("../db.js");
const User = require("./User");
const Post = require("./Post");
const Template = require ("./Template");


async function commonBeforeAll() {
    await db.query("DELETE FROM users;");
    await db.query("DELETE FROM posts;");
    await db.query("DELETE FROM templates;");

    const testUser0 = {
                        firstName:"Jimmy", 
                        lastName:"Dean", 
                        username:"JDean1", 
                        password:"1234", 
                        address:"my house", 
                        email:"jdean@gmail.com", 
                        isAdmin:true,
                     }
    await User.register(testUser0)

    const testPost0 = {
        title: "test title", 
        link:"https://kdvr.com/news/coronavirus/omicron-variant-case-confirmed-in-boulder-county/", 
        body: "we need to do x, y, z", 
        username: "JDean1", 
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

module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
};
