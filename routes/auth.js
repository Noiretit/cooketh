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

    if (email === "" || password === "") {
        res.render('auth/signup-chef.hbs', {
            errorMessage: "Enter both email and password"
        });
        return;
    };

    Chef.findOne({
            email
        })
        .then((foundUser) => {
            if (foundUser) {
                res.render('auth/signup', {
                    errorMessage: `There's already an account with this email: ${email}`
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
                .then(() => {
                    res.redirect('/homepage.hbs')
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
        phone,
        address,
        age,
        diet,
        allergies,
        password,
        repeatPassword
    } = req.body;

    console.log(req.body)
})

module.exports = router;