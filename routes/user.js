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

router.get('/profile-user/:id/edit', (req, res, next) => {
    User.findById(req.params.id)
        .then(thisUserDB => {
            res.render('profiles/edit-user-profile.hbs', {
                thisUser: thisUserDB
            })
        })
        .catch((err) => {
            console.log('Error while displaying EDIT user profile', err)
            next(err)
        })
})

router.post('/profile-user/:id/edit', (req, res, next) => {
    const userId = req.params.id;
    const updatedUser = {
        name,
        email,
        phoneNumber,
        address,
        age,
        diet,
        allergies,
        password,
        repeatPassword,
        description,
        pictures,
        facebook,
        instagram,
        twitter
    } = req.body;

    User.findByIdAndUpdate(userId, updatedUser)
        .then(() => {
            res.redirect('/user-profile')
        })
        .catch((err) => {
            console.log('Error while updating the user profile (user.js line 46)', err)
            next(err)
        })
})


module.exports = router;