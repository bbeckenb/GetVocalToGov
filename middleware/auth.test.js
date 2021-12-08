"use strict";

const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../ExpressError");
const {
    authJWT, 
    checkLoggedIn,
    checkCorrectUserOrAdmin
} = require("./auth");

const { SECRET_KEY } = require("../config");
const goodJWTwithAdmin = jwt.sign({ username: "test", isAdmin: true }, SECRET_KEY);
const goodJWTnoAdmin = jwt.sign({ username: "test", isAdmin: false }, SECRET_KEY);
const badJWT = jwt.sign({ username: "test", isAdmin: true }, 'bad_key');

describe("authJWT", function () {
    test("works through header", function () {
        const req = { headers: { authorization: `Bearer ${goodJWTnoAdmin}` } };
        const res = { locals: {} };
        const next = function (err) {
            expect(err).toBeFalsy();
        };
        authJWT(req, res, next);
        expect(res.locals).toEqual({
            user: {
                iat: expect.any(Number),
                username: "test",
                isAdmin: false
            }
        });
    });

    test("works with no header", function () {
        const req = {};
        const res = { locals: {} };
        const next = function (err) {
            expect(err).toBeFalsy();
        };
        authJWT(req, res, next);
        expect(res.locals).toEqual({});
    })

    test("works with bad token", function () {
        const req = { headers: { authorization: `Bearer ${badJWT}` } };
        const res = { locals: {} };
        const next = function (err) {
            expect(err).toBeFalsy();
        };
        authJWT(req, res, next);
        expect(res.locals).toEqual({});
    });
});

describe("checkLoggedIn", function () {
    test("works", function() {
        expect.assertions(1);
        const req = {};
        const res = { locals: { user: { username: "test", isAdmin: false} } };
        const next = function (err) {
            expect(err).toBeFalsy();
        }
        checkLoggedIn(req, res, next);
    })

    test("unauth if user not logged in", function () {
        expect.assertions(1);
        const req = {};
        const res = { locals: {} };
        const next = function (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy();
        };
        checkLoggedIn(req, res, next);
    });
});

describe("checkCorrectUserOrAdmin", function () {
    test("works for admin", function() {
        const req = { params: { username: "test" } };
        const res = { locals: { user: { username: "admin", isAdmin: true } } };
        const next = function (err) {
            expect(err).toBeFalsy();
        }
        checkCorrectUserOrAdmin(req, res, next);
    });

    test("works for correct user", function() {
        const req = { params: { username: "test" } };
        const res = { locals: { user: { username: "test", isAdmin: false } } };
        const next = function (err) {
            expect(err).toBeFalsy();
        }
        checkCorrectUserOrAdmin(req, res, next);
    });

    test("stops wrong user non admin", function() {
        const req = { params: { username: "wrong" } };
        const res = { locals: { user: { username: "test", isAdmin: false } } };
        const next = function (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy();
        }
        checkCorrectUserOrAdmin(req, res, next);
    });
})