'use strict'
const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Chef = require('../models/chef')
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

router.get('/profile-chef', (req, res, next) => {
    Chef.findById(req.session.currentUser._id)
        .then(thisChefDB => {
            res.render('profiles/chef-profile.hbs', {
                thisChef: thisChefDB
            })
        })
        .catch((err) => {
            console.log('Error while displaying chef profile', err)
            next(err)
        })
});


module.exports = router;