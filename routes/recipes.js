'use strict'
const express = require('express');
const router = express.Router();

const Recipe = require('../models/recipe');
const Chef = require('../models/chef');

router.get('/recipe/new', (req, res, next) => {
    res.render('recipe/createRecipe', {
        errorMessage: ''
    });
    return
});

router.post('/recipe/new', (req, res, next) => {
    const {
        title,
        typoOfFood,
        diet,
        allergies,
        serves,
        price,
        ingredients,
        description,
        pictures,
        chef
    } = req.body;

    if (title === "" || typoOfFood === "" || diet === "" || allergies === "" || serves === "" || price === "" || ingredients === "" || description === "") {
        res.render('recipe/createRecipe.hbs', {
            errorMessage: "Fill up all the form, please"
        });
        return;
    };

    console.log(req.body)

    Recipe.create({
            title,
            typoOfFood,
            diet,
            allergies,
            serves,
            price,
            ingredients,
            description,
            pictures,
            chef
        })
        .then(() => {
            console.log('new recipe created')
            //Tenemos que cambiar la redirection al perfil del chef
            res.redirect('/')
        })
        .catch((err) => {
            res.render('recipe/createRecipe', {
                errorMessage: "Error while creating a new recipe, please try again"
            })
        })


})

module.exports = router;