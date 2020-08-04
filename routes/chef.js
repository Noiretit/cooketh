'use strict'
const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Chef = require('../models/chef')
const Recipe = require('../models/recipe');
const Booking = require('../models/booking');
const uploadCloud = require('../config/cloudinary.js');

router.get('/profile-chef/:id', (req, res, next) => {
    const chefId = req.params.id;
    Chef.findById(chefId)
        .populate('recipes') //PREGUNTAR A CAPU SI SE PUEDE USAR CON UN EACH EN CHEF-PROFILE.HBS
        .then(thisChefDB => {
            console.log(thisChefDB)
            res.render('profiles/chef-profile.hbs', {
                thisChef: thisChefDB
            })
        })
        .catch((err) => {
            console.log('Error while displaying chef profile', err)
            next(err)
        })
});

// MIDDLEWARE =>
//If chef is connected, go to next routes
router.use((req, res, next) => {
    if (req.session.currentUser) {
        next();
        return;
    }
    res.redirect('/login');
});

router.get('/profile-chef/edit', (req, res, next) => {
    Chef.findById(req.session.currentUser._id)
        .then(thisChefDB => {
            const daysArray = ['Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday', 'Sunday'];
            const daysObj = {};
            thisChefDB.workingDays.forEach(day => {
                daysObj[day] = true;
            });
            daysArray.forEach(dayName => {
                if (!daysObj[dayName]) {
                    daysObj[dayName] = false
                }
            });
            console.log(daysObj);
            res.render('profiles/edit-chef-profile.hbs', {
                thisChef: thisChefDB,
                days: daysObj,
            })
        })
        .catch((err) => {
            console.log('Error while displaying EDIT chef profile', err)
            next(err)
        })
})

router.post('/profile-chef/edit', uploadCloud.single('photo'), (req, res, next) => {
    const body = req.body;
    const updatedChef = {
        name: body.name,
        email: body.email,
        phoneNumber: body.phoneNumber,
        address: body.address,
        age: body.age,
        mainCookSpecialty: body.mainCookSpecialty,
        workingDays: body.workingDays,
        description: body.description,
        facebook: body.facebook,
        instagram: body.instagram,
        twitter: body.twitter
    }

    Chef.findByIdAndUpdate(req.session.currentUser._id, updatedChef)
        .then(() => {
            res.redirect('/profile-chef')
        })
        .catch((err) => {
            console.log('Error while updating the chef DB, line 59 chef.js', err)
            next(err)
        })
})


module.exports = router;