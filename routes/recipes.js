'use strict'
const express = require('express');
const router = express.Router();

const Recipe = require('../models/recipe');



router.get('/recipe/new', (req, res, next) => {
    res.render('recipe/createRecipe')
})

module.exports = router;