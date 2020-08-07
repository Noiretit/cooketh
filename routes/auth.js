'use strict'

const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./../models/user');
const Chef = require('./../models/chef');
const Recipe = require('./../models/recipe');
const uploadCloud = require('../config/cloudinary.js');

const router = express.Router();
const bcryptSalt = 10;

//ROUTE RECIPES
router.get('/recipes', (req, res, next) => {
    Recipe.find()
        .populate('chef')
        .then((allRecipes) => {
            console.log(allRecipes);
            res.render('recipe/list-recipes', {
                recipes: allRecipes
            });
        })
        .catch((err) => {
            console.log('Failed loading the recipes');
            res.render('/');
        })
})

//ROUTE RECIPE DETAILS PAGE
router.get('/recipes/:id', (req, res, next) => {
    const recipeId = req.params.id;
    Recipe.findById(recipeId)
        .populate('chef')
        .populate('user')
        .then(oneRecipe => {
            console.log(oneRecipe)
            res.render('recipe/info-recipe', {
                recipeinfo: oneRecipe
            });
        })
        .catch(error => {
            console.log('Error getting the recipes info from the DB', error);
        });
})

//ROUTE F.A.Q
router.get('/faq', (req, res, next) => {
    res.render('faq.hbs', {
        errorMessage: ''
    });
    return
})

//ROUTER SIGNUP CHEF
router.get('/signup-chef', (req, res, next) => {
    res.render('auth/signup-chef', {
        errorMessage: ''
    });
    return
});

router.post('/signup-chef', uploadCloud.single('photo'), (req, res, next) => {
    const {
        name,
        email,
        phoneNumber,
        address,
        age,
        mainCookSpecialty,
        workingDays,
        password,
        repeatPassword,
        facebook,
        instagram,
        twitter
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
            const imgPath = req.file.path;
            const imgName = req.file.originalname;

            Chef.create({
                    name,
                    email,
                    phoneNumber,
                    address,
                    age,
                    mainCookSpecialty,
                    workingDays,
                    password: hashedPassword,
                    picture: imgPath,
                    facebook,
                    instagram,
                    twitter
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
        .catch((err) => console.log('Error by finding chef (auth.js line 125'));
})

//ROUTE SIGNUP USER
router.get('/signup-user', (req, res, next) => {
    res.render('auth/signup-user', {
        errorMessage: ''
    });
});

router.post('/signup-user', uploadCloud.single('photo'), (req, res, next) => {
    const {
        name,
        email,
        phoneNumber,
        address,
        age,
        diet,
        allergies,
        password,
        repeatPassword,
        facebook,
        instagram,
        twitter
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
            const imgPath = req.file.path;
            const imgName = req.file.originalname;

            User.create({
                    name,
                    email,
                    phoneNumber,
                    address,
                    age,
                    diet,
                    allergies,
                    password: hashedPassword,
                    picture: imgPath,
                    facebook,
                    instagram,
                    twitter
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

//ROUTE LOGIN
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

//LOGOUT
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