'use strict'
const express = require('express');
const router = express.Router();
module.exports = router;

const User = require('./../models/user');
const Chef = require('./../models/chef');
const Booking = require('./../models/booking');
const Recipe = require('./../models/recipe');

//ROUTER BOOKINGS CHEF
router.get('/bookings', (req, res, next) => {
    const userId = req.params.id;

    Chef.findById(userId, (err, theChef) => {
        if (err) {
            next(err);
            return;
        }
        res.render('myBookings/bookings', {
            theChefWeWant: theChef
        });
    });
});