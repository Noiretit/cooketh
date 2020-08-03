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

router.get('/profile-user/edit', (req, res, next) => {
    User.findById(req.session.currentUser._id)
        .then(thisUserDB => {
            const allergiesArray = ['Eggs', 'Dairy', 'Peanuts', 'Tree nuts', 'Fish', 'Shellfish', 'Wheat', 'Soy', 'Legumes', 'Gluten', 'Vegetables', 'Fruits'];
            const allergiesObj = {};
            thisUserDB.allergies.forEach(allergy => {
                allergiesObj[allergy] = true;
            });
            allergiesArray.forEach(allergyName => {
                if (!allergiesObj[allergyName]) {
                    allergiesObj[allergyName] = false
                }
            });
            console.log(allergiesObj);
            res.render('profiles/edit-user-profile.hbs', {
                thisUser: thisUserDB,
                allergies: allergiesObj,
            })
        })
        .catch((err) => {
            console.log('Error while displaying EDIT user profile', err)
            next(err)
        })
})

router.post('/profile-user/edit', (req, res, next) => {

})


module.exports = router;