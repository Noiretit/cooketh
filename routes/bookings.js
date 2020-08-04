'use strict'
const express = require('express');
const router = express.Router();
module.exports = router;

const User = require('./../models/user');
const Chef = require('./../models/chef');
const Booking = require('./../models/booking');
const Recipe = require('./../models/recipe');

//ROUTER BOOKINGS USER OR CHEF
router.get('/bookings', (req, res, next) => {
    const userId = req.session.currentUser._id;

    Booking.find()
        .populate('chef')
        .populate('customer')
        .populate('recipe')
        .then((allBookings) => {
            console.log(allBookings)
            let arrOfCorrespondingObj = [];
            for (var i = 0; i < allBookings.length; i++) {
                if (allBookings[i].customer._id.equals(userId) || allBookings[i].chef._id.equals(userId)) {
                    arrOfCorrespondingObj.push(allBookings[i])
                }
            }

            res.render('myBookings/bookings.hbs', {
                bookings: arrOfCorrespondingObj
            });
        })
        .catch((err) => {
            console.log('Failed loading the bookings');
            res.render('/');
        })
});

//TO CREATE ONE NEW BOOKING
router.post('/new-booking', (req, res, next) => {
    const bookingInfo = {
        hour: req.body.hour,
        date: req.body.date,
        address: req.body.address,
        numberOfDishes: req.body.numberOfDishes,
        customer: req.session.currentUser._id,
        chef: req.body.idOfCooker,
        recipe: req.body.idOfRecipe
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

//TO DELETE ONE BOOKING
router.post('/delete-booking', (req, res, next) => {
    const idOfBooking = req.body.idOfBooking;
    console.log(idOfBooking)
    // Booking.deleteOne('idOfBooking');

    Booking.deleteOne({
            _id: idOfBooking
        }, function (err) {
            if (err) console.log(err);
            console.log("Successful deletion");
        })
        .then(res.redirect('/bookings'))
})

//TO delete one booking
// const deleteOneBooking = document.getElementById('cancel-button-bookings');
// deleteOneBooking.addEventListener('click', function (e) {
//     const idOfBooking = e.target.value;
//     const bookingToRemove = Booking.findById(idOfBooking);
//     Booking.remove(bookingToRemove);

// })