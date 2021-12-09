"use strict";

const express = require("express");
const jsonschema = require("jsonschema");
const userUpdateSchema = require("../schemas/userUpdateSchema.json");
const {
    checkLoggedIn,
    checkCorrectUserOrAdmin
} = require("../middleware/auth");
const User = require("../models/User");
const { BadRequestError } = require("../ExpressError");

const router = express.Router();

router.get("/:username", checkLoggedIn, async function (req, res, next) {
    try {
        const user = await User.getUser(req.params.username);
        return res.json({ user });
    } catch (err) {
        return next(err);
    }
});

router.patch("/:username", checkCorrectUserOrAdmin, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userUpdateSchema);
        if(!validator.valid) {
            const errs = validator.errors.map(err => err.stack);
            throw new BadRequestError(errs);
        }
        const userBeforeChanges = await User.getUser(req.params.username);
        const user = await User.update(req.params.username, { ...req.body, isAdmin: userBeforeChanges.isAdmin });
        return res.json({ user })
    } catch (err) {
        return next(err);
    }
});

router.delete("/:username", checkCorrectUserOrAdmin, async function (req, res, next) {
    try {
        await User.deleteUser(req.params.username);
        return res.json({ deleted: req.params.username });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
