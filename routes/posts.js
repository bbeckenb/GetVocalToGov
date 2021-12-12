"use strict";

const express = require("express");
const jsonschema = require("jsonschema");
const createPostSchema = require("../schemas/postCreateSchema.json");
const updatePostSchema = require("../schemas/postUpdateSchema.json");

const {
    checkLoggedIn,
    checkCorrectUserOrAdmin
} = require("../middleware/auth");
const Post = require("../models/Post");
const User = require("../models/User");
const { 
    BadRequestError, 
    NotFoundError,
    UnauthorizedError
} = require("../ExpressError");

const router = express.Router();

router.post("/", checkLoggedIn, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, createPostSchema);
        if(!validator.valid) {
            const errs = validator.errors.map(err => err.stack);
            throw new BadRequestError(errs);
        }
        const user = await User.getUser(res.locals.user.username);
        const post = await Post.create({ ...req.body, userId: user.id });
        return res.status(201).json({ post });
    } catch (err) {
        return next(err); 
    } 
});

router.get("/:postId", checkLoggedIn, async function (req, res, next) {
    try {
        const post = await Post.getPost(req.params.postId);
        return res.json({ post });
    } catch (err) {
        return next(err);
    }
});

router.patch("/:postId", checkLoggedIn, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, createPostSchema);
        if(!validator.valid) {
            const errs = validator.errors.map(err => err.stack);
            throw new BadRequestError(errs);
        }
        const user = await User.getUser(res.locals.user.username);
        const postToUpdate = await Post.getPost(req.params.postId);
        if (user.id !== postToUpdate.userId) {
            throw new UnauthorizedError();
        }
        const post = await Post.update(req.params.postId, { ...req.body, userId: user.id });
        return res.json({ post });
    } catch (err) {
        return next(err); 
    } 
});

router.delete("/:postId", checkLoggedIn, async function (req, res, next) {
    try {
        const user = await User.getUser(res.locals.user.username);
        const postToUpdate = await Post.getPost(req.params.postId);
        if (user.id !== postToUpdate.userId) {
            throw new UnauthorizedError();
        }
        await Post.deletePost(req.params.postId);
        return res.json({ deleted: Number(req.params.postId) })
    } catch (err) {
        return next(err);
    }
});

module.exports = router;