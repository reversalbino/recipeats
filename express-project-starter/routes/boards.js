const express = require('express');
const { check, validationResult } = require('express-validator');
const { csrfProtection, asyncHandler } = require('./utils');
const db = require('../db/models'); //db.Model
const { requireAuth } = require('../auth');

const router = express.Router();

router.get('/', requireAuth, asyncHandler(async(req, res) => {
    //display all user boards 
    const {userId} = req.session.auth
    const boards = await db.Board.findAll({where: {userId}});
    res.render('boards', {title: 'Recipeats | Boards', boards})
}));

let errors = []

router.get('/new', requireAuth, csrfProtection, asyncHandler(async(req, res) => {
    res.render('new-board', { title: 'Recipeats | New Board', csrfToken: req.csrfToken(), errors });
}));

const boardValidator = [
    check('boardName')
    .exists({checkFalsy: true})
    .withMessage('Please provide a board name')
];

router.post('/new', requireAuth, boardValidator, csrfProtection, asyncHandler(async(req, res) => {
    const name = req.body.boardName;
    console.log(req.boardName);
    const userId = req.session.auth.userId
    let board = db.Board.build({
        name,
        userId
    });

    const validatorErrors = validationResult(req);

    if(validatorErrors.isEmpty()) {
        await board.save();
        res.redirect(`/boards`)
    }
    else {
        errors = validatorErrors.array().map((error) => error.msg);
        res.render('new-board', {
            title: 'Recipeats | New Board', csrfToken: req.csrfToken(), errors
        });
        errors = [];
    }
}));

router.get('/:id(\\d+)', requireAuth, asyncHandler(async(req, res) => {
const boardId = req.params.id
// console.log('----BID-----', boardId);
let recipes = await db.Recipe.findAll({
    where: id=1
})
console.log('----recipes-----', recipes);
res.render('board', {title: 'Recipeats | Board', recipes})
}))

module.exports = router;

