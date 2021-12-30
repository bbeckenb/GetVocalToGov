const express = require('express');
const jsonschema = require('jsonschema');
const userUpdateSchema = require('../schemas/userUpdateSchema.json');
const {
  checkLoggedIn,
  checkCorrectUserOrAdmin,
} = require('../middleware/auth');
const User = require('../models/User');
const { BadRequestError } = require('../ExpressError');

const router = express.Router();

// register / login (C of CRUD) is part of auth

router.get('/:username', checkLoggedIn, async (req, res, next) => {
  try {
    const user = await User.getUser(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

router.patch('/:username', checkCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((err) => err.stack);
      throw new BadRequestError(errs);
    }
    const currUser = await User.getUser(req.params.username);
    const user = await User.update(currUser.username, { ...req.body, isAdmin: currUser.isAdmin });
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

router.delete('/:username', checkCorrectUserOrAdmin, async (req, res, next) => {
  try {
    await User.deleteUser(req.params.username);
    return res.json({ deleted: req.params.username });
  } catch (err) {
    return next(err);
  }
});

router.post('/:username/templates/:templateId', checkCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const { username, templateId } = req.params;
    const id = await User.addFavorite(username, templateId);
    return res.status(201).json({ favorited: id });
  } catch (err) {
    return next(err);
  }
});

router.delete('/:username/templates/:templateId', checkCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const { username, templateId } = req.params;
    const id = await User.removeFavorite(username, templateId);
    return res.status(200).json({ unfavorited: id });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
