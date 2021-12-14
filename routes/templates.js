"use strict";

const express = require("express");
const jsonschema = require("jsonschema");
const templateCreateSchema = require("../schemas/templateCreateSchema.json");
const templateUpdateSchema = require("../schemas/templateUpdateSchema.json");
const {
    checkLoggedIn,
    checkCorrectUserOrAdmin
} = require("../middleware/auth");
const Template = require("../models/Template");

const { 
    BadRequestError, 
    NotFoundError,
    UnauthorizedError
} = require("../ExpressError");

const router = express.Router();

router.post("/", checkLoggedIn, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, templateCreateSchema);
        if(!validator.valid) {
            const errs = validator.errors.map(err => err.stack);
            throw new BadRequestError(errs);
        }
        const template = await Template.create({ ...req.body, userId: res.locals.user.username });
        return res.status(201).json({ template });
    } catch (err) {
        return next(err); 
    } 
});

router.get("/:templateId", checkLoggedIn, async function (req, res, next) {
    try {
        const template = await Template.getTemplate(req.params.templateId);
        return res.json({ template });
    } catch (err) {
        return next(err);
    }
});

router.patch("/:templateId", checkLoggedIn, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, templateUpdateSchema);
        if(!validator.valid) {
            const errs = validator.errors.map(err => err.stack);
            throw new BadRequestError(errs);
        }
        const templateToUpdate = await Template.getTemplate(req.params.templateId);
        if (res.locals.user.username !== templateToUpdate.userId) {
            throw new UnauthorizedError();
        }
        const template = await Template.update(req.params.templateId, { ...req.body, userId: res.locals.user.username });
        return res.json({ template });
    } catch (err) {
        return next(err); 
    } 
});

router.delete("/:templateId", checkCorrectUserOrAdmin, async function (req, res, next) {
    // try {
    //     const postToDelete = await Post.getPost(req.params.postId);
    //     if (!res.locals.user.isAdmin && res.locals.user.username !== postToDelete.userId) {
    //         throw new UnauthorizedError();
    //     }
    //     await Post.deletePost(req.params.postId);
    //     return res.json({ deleted: Number(req.params.postId) })
    // } catch (err) {
    //     return next(err);
    // }
});

module.exports = router;