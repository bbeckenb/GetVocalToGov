"use strict";

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../ExpressError");
const Post = require("../models/Post");
const Template = require("../models/Template");

function authJWT(req, res, next) {
    try {
        const authInHeader = req.headers.authorization;
        if(authInHeader) {
            const token = authInHeader.replace(/Bearer /, "").trim();
            res.locals.user = jwt.verify(token, SECRET_KEY);
        }
        return next();
    } catch (err) {
        return next();
    }
}

function checkLoggedIn(req, res, next) {
    try {
        if(!res.locals.user) throw new UnauthorizedError();
        return next();
    } catch (err) {
        return next(err);
    }
}

function checkCorrectUserOrAdmin(req, res, next) {
    try {
        const user = res.locals.user;
        if (!(user && (user.isAdmin || user.username === req.params.username))) {
            throw new UnauthorizedError();
        }
        return next();
    } catch (err) {
        return next(err);
    }
}

async function checkPostOwnerOrAdmin(req, res, next) {
    try {
        const user = res.locals.user;
        const postRequested = await Post.getPost(req.params.postId);
        if (!user.isAdmin && user.username !== postRequested.userId) {
            throw new UnauthorizedError();
        }
        return next();
    } catch (err) {
        return next(err);
    }
}

async function checkTemplateOwnerOrAdmin(req, res, next) {
    try {
        const user = res.locals.user;
        const templateRequested = await Template.getTemplate(req.params.templateId);
        if (!user.isAdmin && user.username !== templateRequested.userId) {
            throw new UnauthorizedError();
        }
        return next();
    } catch (err) {
        return next(err);
    }
}

// create ownership check

module.exports = {
    authJWT,
    checkLoggedIn,
    checkCorrectUserOrAdmin,
    checkPostOwnerOrAdmin,
    checkTemplateOwnerOrAdmin
}