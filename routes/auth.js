const jsonschema = require('jsonschema');
const express = require('express');
const JwtClient = require('../services/JwtClient');
const {
  BadRequestError,
} = require('../ExpressError');
const User = require('../models/User');
const userAuthSchema = require('../schemas/userAuthSchema.json');
const userRegisterSchema = require('../schemas/userRegisterSchema.json');

const router = new express.Router();

router.post('/token', async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, userAuthSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((err) => err.stack);
      throw new BadRequestError(errs);
    }

    const { username, password } = req.body;
    const user = await User.authenticate(username, password);
    const token = JwtClient.genAuthToken(user);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, userRegisterSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((err) => err.stack);
      throw new BadRequestError(errs);
    }
    const newUser = await User.register({ ...req.body, isAdmin: false });
    const token = JwtClient.genAuthToken(newUser);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
