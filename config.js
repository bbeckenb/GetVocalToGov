"use strict";

/** Shared config for application; can be required many places. */

require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "secret_key";

const PORT = +process.env.PORT || 3001;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
      ? "get_vocal_to_gov_db_test"
      : process.env.DATABASE_URL || "get_vocal_to_gov_db";
}

// Speed up bcrypt during tests, since the algorithm safety isn't being tested
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("**********************");
console.log("GetVocalToGov Config:".america);
console.log("SECRET_KEY:".cyan, SECRET_KEY);
console.log("PORT:".cyan, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".cyan, BCRYPT_WORK_FACTOR);
console.log("Database:".cyan, getDatabaseUri());
console.log("**********************");

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};
