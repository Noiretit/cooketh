'use strict'
const express = require('express');
const router = express.Router();
const uploadCloud = require('../config/cloudinary.js');
var multer = require('multer');

const Recipe = require('../models/recipe');
const Chef = require('../models/chef');

router.get('/recipe/new', (req, res, next) => {
    res.render('recipe/createRecipe', {
        errorMessage: ''
    });
    return
});

router.post('/recipe/new', uploadCloud.single('photo'), (req, res, next) => {
    const {
        title,
        typeOfFood,
        diet,
        allergies,
        serves,
        price,
        ingredients,
        description,
        pictures,
        chef
    } = req.body;

    if (title === "" || typeOfFood === "" || diet === "" || allergies === "" || serves === "" || price === "" || ingredients === "" || description === "") {
        res.render('recipe/createRecipe.hbs', {
            errorMessage: "Fill up all the form, please"
        });
        return;
    };

    const imgPath = req.file.path;
    const imgName = req.file.originalname;

    const newRecipe = new Recipe({
        title,
        typeOfFood,
        diet,
        allergies,
        serves,
        price,
        ingredients,
        description,
        imgPath,
        chef
    })
    newRecipe
        .save()
        .then((newRecipeDB) => {
            console.log('New recipe created')
            res.redirect('/')
        })
        .catch((err) => {
            console.log('Error while creating recipe', err)
            res.render('recipe/createRecipe')
        })
})

module.exports = router;