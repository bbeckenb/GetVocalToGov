const express = require('express');
const jsonschema = require('jsonschema');
const {
    checkLoggedIn,
    checkCorrectUserOrAdmin
} = require('../middleware/auth');
const GoogleCivicClient = require('../services/GoogleCivicClient');
const User = require('../models/User');


const router = express.Router();

router.get('/:username', checkLoggedIn, checkCorrectUserOrAdmin, async (req, res, next) => {
    try {
        const user = await User.getUser(req.params.username);
        const reps = await GoogleCivicClient.getRepresentatives(user);
        return res.json({ representatives: reps.data })
    } catch (err) {
        console.log(err)
        return next(err);
    }
})

module.exports = router;