const express = require('express');
const { check, validationResult } = require('express-validator');
const { csrfProtection, asyncHandler } = require('./utils');
const db = require('../db/models'); //db.Model
const { loginUser, logoutUser, requireAuth } = require('../auth');

const router = express.Router();

router.get('/', requireAuth, asyncHandler(async(req, res) => {
    //display all user boards 
    const {userId} = req.session.auth
    const boards = await db.Board.findAll({where: {userId}});
    res.render('boards', {title: 'Recipeats | Boards', boards})
}));

module.exports = router;

