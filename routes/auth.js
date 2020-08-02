'use strict'

const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./../models/user');
const Chef = require('./../models/chef');

const router = express.Router();
const bcryptSalt = 10;

router.get('/signup-chef', (req, res, next) => {
    res.render('auth/signup-chef', {
        errorMessage: ''
    });
    return
});

router.post('/signup-chef', (req, res, next) => {
    const {
        name,
        email,
        phoneNumber,
        address,
        age,
        mainCookSpecialty,
        workingDays,
        password,
        repeatPassword
    } = req.body;

    if (name === "" || email === "" || phoneNumber === "" || address === "" || age === "" || mainCookSpecialty === "" || workingDays === "" || password === "") {
        res.render('auth/signup-chef.hbs', {
            errorMessage: "Fill up all the form, please"
        });
        return;
    };

    Chef.findOne({
            email
        })
        .then((foundChef) => {
            if (foundChef) {
                res.render('auth/signup-chef', {
                    errorMessage: `There's already a chef account with this email: ${email}`
                });
                return
            };

            const salt = bcrypt.genSaltSync(bcryptSalt);
            const hashedPassword = bcrypt.hashSync(password, salt);

            Chef.create({
                    name,
                    email,
                    phoneNumber,
                    address,
                    age,
                    mainCookSpecialty,
                    workingDays,
                    password: hashedPassword
                })
                .then(newChefObj => {
                    req.session.currentUser = newChefObj;
                    res.redirect('/')
                })
                .catch((err) => {
                    res.render('auth/signup-chef', {
                        errorMessage: "Error while creating a chef account, please try again"
                    })
                })
        })
        .catch((err) => console.log('Error by finding chef (auth.js line 38'));
})

router.get('/signup-user', (req, res, next) => {
    res.render('auth/signup-user', {
        errorMessage: ''
    });
});

router.post('/signup-user', (req, res, next) => {
    const {
        name,
        email,
        phoneNumber,
        address,
        age,
        diet,
        allergies,
        password,
        repeatPassword
    } = req.body;

    if (name === "" || email === "" || phoneNumber === "" || address === "" || age === "" || diet === "" || allergies === "" || password === "") {
        res.render('auth/signup-user.hbs', {
            errorMessage: "Fill up all the form, please"
        });
        return;
    };

    User.findOne({
            email
        })
        .then((foundUser) => {
            if (foundUser) {
                res.render('auth/signup-user', {
                    errorMessage: `There's already a user account with this email: ${email}`
                });
                return
            };

            const salt = bcrypt.genSaltSync(bcryptSalt);
            const hashedPassword = bcrypt.hashSync(password, salt);

            User.create({
                    name,
                    email,
                    phoneNumber,
                    address,
                    age,
                    diet,
                    allergies,
                    password: hashedPassword
                })
                .then(newUserObj => {
                    req.session.currentUser = newUserObj;
                    res.redirect('/')
                })
                .catch((err) => {
                    res.render('auth/signup-user', {
                        errorMessage: "Error while creating a user account, please try again"
                    })
                })
        })
        .catch((err) => console.log('Error by finding user (auth.js line 38'));
})

router.get('/login', (req, res, next) => {
    res.render('auth/login', {
        errorMessage: ''
    });
    return
});

router.post('/login', (req, res, next) => {
    const emailInput = req.body.email;
    const passwordInput = req.body.password;

    if (emailInput === '' || passwordInput === '') {
        res.render('auth/login', {
            errorMessage: 'Enter both email and password to log in.'
        });
        return;
    }

    const isAChef = req.body.isAChef;

    if (isAChef) {
        Chef.findOne({
            email: emailInput
        }, (err, theChef) => {
            if (err || theChef === null) {
                res.render('auth/login', {
                    errorMessage: `There isn't an account with email ${emailInput}.`
                });
                return;
            }

            if (!bcrypt.compareSync(passwordInput, theChef.password)) {
                res.render('auth/login', {
                    errorMessage: 'Invalid password.'
                });
                return;
            }

            req.session.currentUser = theChef;
            res.redirect('/');
        });
    } else {
        User.findOne({
            email: emailInput
        }, (err, theUser) => {
            if (err || theUser === null) {
                res.render('auth/login', {
                    errorMessage: `There isn't an account with email ${emailInput}.`
                });
                return;
            }

            if (!bcrypt.compareSync(passwordInput, theUser.password)) {
                res.render('auth/login', {
                    errorMessage: 'Invalid password.'
                });
                return;
            }

            req.session.currentUser = theUser;
            res.redirect('/');
        });
    }
});

router.get('/logout', (req, res, next) => {
    if (!req.session.currentUser) {
        res.redirect('/');
        return;
    }

    req.session.destroy((err) => {
        if (err) {
            next(err);
            return;
        }

        res.redirect('/');
        console.log('You are now disconnected')
    });
});

module.exports = router;