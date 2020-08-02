'use strict'
const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Chef = require('../models/chef')
const Recipe = require('../models/recipe');
const Booking = require('../models/booking')

// MIDDLEWARE =>
//If user is connected, go to next routes
router.use((req, res, next) => {
    if (req.session.currentUser) {
        next();
        return;
    }
    res.redirect('/login');
});

router.get('/profile-user', (req, res, next) => {
    User.findById(req.session.currentUser._id)
        .then(thisUserDB => {
            res.render('profiles/user-profile.hbs', {
                thisUser: thisUserDB
            })
        })
        .catch((err) => {
            console.log('Error while displaying user profile', err)
            next(err)
        })
});


module.exports = router;