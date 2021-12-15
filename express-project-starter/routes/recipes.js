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

router.get('/:id', async (req, res, next) => {
    const recipe = await db.Recipe.findByPk(req.params.id, {
        include: [db.Ingredient, db.Instruction]
    });

//    const instructionList = instructions.forEach(instruction => {
//        console.log(instruction.dataValues.specification.split(','))
//    })
//    console.log(instructionList)

    res.render('recipe-detail', { recipe })
});

router.use((req, res, next) => {
    console.log('--------ADD RECIPE TO BOARD 1');
    next();
});

router.post('/:rId/boards/:bId', async (req, res, next) => {
    console.log('--------ADD RECIPE TO BOARD 2');
    const recipeId = req.params.rId
    const boardId = req.params.bId

    let addedRecipe = await db.RecipesOnBoard.create({
        recipeId,
        boardId
    })

    console.log("HELLO IM RIGHT HERE", req.params.id)
    res.redirect('/');
})


module.exports = router;
