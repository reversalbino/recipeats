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
 let recipeBoards;
    // if(req.session.auth) {
        recipeBoards = await db.Board.findAll({
            where: {userId: req.session.auth.userId}
        })
    console.log(recipe)
    //    const instructionList = instructions.forEach(instruction => {
        //        console.log(instruction.dataValues.specification.split(','))
        //    })
        //    console.log(instructionList)
    res.render('recipe-detail', { recipe, recipeBoards })

});

router.use((req, res, next) => {
    console.log('--------ADD RECIPE TO BOARD 1');
    next();
});

router.post('/:rId/boards', async (req, res, next) => {
    console.log('--------ADD RECIPE TO BOARD 2');
    const recipeId = req.params.rId
    const boardId = req.body.addToBoard

    let addedRecipe = await db.RecipesOnBoard.build({
        recipeId,
        boardId
    })

    
    console.log("---------------------------------", req.body.addToBoard)
    res.redirect('/');
})


module.exports = router;
