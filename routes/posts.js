const express = require('express');
const jsonschema = require('jsonschema');
const postGetFilterSchema = require('../schemas/postGetFilterSchema.json');
const postCreateSchema = require('../schemas/postCreateSchema.json');
const postUpdateSchema = require('../schemas/postUpdateSchema.json');

const {
  checkLoggedIn,
  checkPostOwnerOrAdmin,
} = require('../middleware/auth');
const Post = require('../models/Post');
const {
  BadRequestError,
} = require('../ExpressError');

const router = express.Router();

router.post('/', checkLoggedIn, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, postCreateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((err) => err.stack);
      throw new BadRequestError(errs);
    }
    const post = await Post.create(req.body);
    return res.status(201).json({ post });
  } catch (err) {
    return next(err);
  }
});

router.get('/', async (req, res, next) => {
  const q = req.query;
  try {
    const validator = jsonschema.validate(q, postGetFilterSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }
    const posts = await Post.getAllOrFilterPosts(q);
    return res.json({ posts });
  } catch (err) {
    return next(err);
  }
});

router.get('/:postId', checkLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.getPost(req.params.postId);
    return res.json({ post });
  } catch (err) {
    return next(err);
  }
});

router.patch('/:postId', checkLoggedIn, checkPostOwnerOrAdmin, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, postUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((err) => err.stack);
      throw new BadRequestError(errs);
    }
    const post = await Post.update(req.params.postId, req.body);
    return res.json({ post });
  } catch (err) {
    return next(err);
  }
});

router.delete('/:postId', checkLoggedIn, checkPostOwnerOrAdmin, async (req, res, next) => {
  try {
    await Post.deletePost(req.params.postId);
    return res.json({ deleted: Number(req.params.postId) });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
