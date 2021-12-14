const express = require('express');
const { check, validationResult } = require('express-validator');
const { csrfProtection, asyncHandler } = require('./utils');
const db = require('../db/models'); //db.Model
const { loginUser, logoutUser } = require('../auth');

const router = express.Router();


router.get('/', async (req, res, next) => {
    const recipes = await db.Recipe.findAll();
    res.render('recipes', { recipes })
})


module.exports = router;
