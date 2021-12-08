"use strict";

const express = require("express");
const jsonschema = require("jsonschema");
const { ensureLoggedIn } = require("../../jobly-backend/middleware/auth");
const {
    checkLoggedIn,
    checkCorrectUserOrAdmin
} = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

router.get("/:username", ensureLoggedIn, async function (req, res, next) {
    try {
        const user = await User.get(req.params.username);
        return res.json({ user });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
