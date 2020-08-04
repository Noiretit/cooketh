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
    const chefId = req.session.currentUser._id;

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
        chef: chefId //Return chef object 
    })
    newRecipe
        .save()
        .then((newRecipeDB) => { //Guarda el ID de la receta en el chef
            console.log('The creator is %s', newRecipeDB.chef)
            return Chef.findByIdAndUpdate(chefId, {
                $push: {
                    recipes: newRecipeDB._id
                }
            })
        })
        .then(() => {
            res.redirect('/')
        })
        .catch((err) => {
            console.log('Error while creating recipe', err)
            res.render('recipe/createRecipe')
        })
});

router.get('/recipes/:id/edit', (req, res, next) => {
    Recipe.findById(req.params.id)
        .populate('chef')
        .then(thisRecipeDB => {
            const allergiesArray = ['Eggs', 'Dairy', 'Peanuts', 'Tree nuts', 'Fish', 'Shellfish', 'Wheat', 'Soy', 'Legumes', 'Gluten', 'Vegetables', 'Fruits'];
            const allergiesObj = {};
            thisRecipeDB.allergies.forEach(allergy => {
                allergiesObj[allergy] = true;
            });
            allergiesArray.forEach(allergyName => {
                if (!allergiesObj[allergyName]) {
                    allergiesObj[allergyName] = false
                }
            });
            console.log(allergiesObj);
            res.render('recipe/edit-recipe.hbs', {
                thisRecipe: thisRecipeDB,
                allergies: allergiesObj,
            })
        })
        .catch((err) => {
            console.log('Error while displaying EDIT recipe', err)
            next(err)
        })
});

router.post('/recipes/:id/edit', (req, res, next) => {
    const recipeId = req.params.id;
    const body = req.body;
    const updatedRecipe = {
        title: body.title,
        typeOfFood: body.typeOfFood,
        diet: body.diet,
        allergies: body.allergies,
        serves: body.serves,
        price: body.price,
        ingredients: body.ingredients,
        description: body.description,
        photo: body.photo,
        chefId: body.chefId
    };

    Recipe.findByIdAndUpdate(recipeId, updatedRecipe)
        .then(() => {
            res.redirect(`/profile-chef/${updatedRecipe.chefId}`)
        })
        .catch((err) => {
            console.log('Error while updating a recipe (recipes.js line 98)')
            next(err)
        })
});

module.exports = router;