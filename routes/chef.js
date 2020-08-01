'use strict'
const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Recipe = require('../models/recipe');
const Booking = require('../models/booking')

// MIDDLEWARE =>
//If chef is connected, go to next routes
router.use((req, res, next) => {
    if (req.session.currentUser) {
        next();
        return;
    }
    res.redirect('/login');
});


module.exports = router;