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
    const userId = req.session.currentUser._id;
    Booking.find()
        .populate('chef')
        .populate('customer')
        .then((allBookings) => {
            console.log(allBookings)
            res.render('myBookings/bookings.hbs', {
                bookings: allBookings
            });
        })
        .catch((err) => {
            console.log('Failed loading the bookings');
            res.render('/');
        })
});

router.post('/new-booking', (req, res, next) => {
    const bookingInfo = {
        hour: req.body.hour,
        date: req.body.date,
        address: req.body.address,
        numberOfDishes: req.body.numberOfDishes,
        customer: req.session.currentUser._id,
        chef: req.body.nameOfCooker
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