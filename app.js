const express = require('express');
const {db} = require('./db');
const {User} = require('./models/User');

const app = express();


app.use(express.json());



module.exports = app;