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

router.post('/new-booking', (req, res, next) => {
    const bookingInfo = {
        hour: req.body.hour,
        time: req.body.time,
        address: req.body.address,
        numberOfDishes: req.body.numberOfDishes,
        customer: req.session.currentUser.id
    }

    const theBooking = new Booking(bookingInfo);

    theBooking.save((err) => {
        console.log(theBooking)
        if (err) {
            next(err);
            return;
        }
        res.redirect('/bookings');
    })
})