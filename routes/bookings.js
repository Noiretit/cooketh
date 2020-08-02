'use strict'
const express = require('express');
const router = express.Router();
module.exports = router;

const User = require('./../models/user');
const Chef = require('./../models/chef');
const Booking = require('./../models/booking');
const Recipe = require('./../models/recipe');

//ROUTER SIGNUP CHEF
router.get('/bookings', (req, res, next) => {
    res.render('myBookings/bookings', {
        errorMessage: ''
    });
    return
});