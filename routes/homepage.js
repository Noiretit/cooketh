'use strict'

const express = require('express');
const router = express.Router();
const Chef = require('../models/chef');
const Recipe = require('./../models/recipe');

/* GET home page. */
router.get('/', (req, res, next) => {
  Recipe.find()
    .populate('chef')
    // .limit(3)
    .then((allRecipes) => {
      console.log('All the recipes are here:', this.allRecipes)

      let randomRecipesArr = [];

      allRecipes.sort(() => Math.random() - 0.5);

      randomRecipesArr.push(allRecipes[0], allRecipes[1], allRecipes[2])

      res.render('homepage.hbs', {
        recipes: randomRecipesArr
      });
    })
    .catch((err) => {
      console.log('Error while displaying the recipes', err)
      res.render('/');
    })
});

module.exports = router;