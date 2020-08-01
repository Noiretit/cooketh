const express = require('express');
const bcrypt = require('bcryptjs');
const bcryptSalt = 10;
const router = express.Router();

const User = require('../models/user');
const Chef = require('../models/chef');

router.get('/signup', (req, res, next) => {
    res.render('auth/signup', {
        errorMessage: ''
    });
});

module.exports = router;