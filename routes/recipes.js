const express = require('express');
const { check, validationResult } = require('express-validator');
const { csrfProtection, asyncHandler } = require('./utils');
const db = require('../db/models'); //db.Model
const { loginUser, logoutUser, requireAuth } = require('../auth');

const router = express.Router();
let errors = [];


router.get('/', async (req, res, next) => {
    const recipes = await db.Recipe.findAll();
    res.render('recipes', { recipes })
})

router.get('/:id', csrfProtection, async (req, res, next) => {
    const recipe = await db.Recipe.findByPk(req.params.id, {
        include: [db.Ingredient, db.Instruction]
    });
 let recipeBoards;
    const reviews = await db.Review.findAll({
        where: {recipeId: req.params.id}
    });
    if(req.session.auth) {
        recipeBoards = await db.Board.findAll({
            where: {userId: req.session.auth.userId}
        })
    console.log(recipe)
    }
    //    const instructionList = instructions.forEach(instruction => {
        //            console.log(instruction.dataValues.specification.split(','))
        //        })
        //        console.log(instructionList)
        res.render('recipe-detail', { recipe, recipeBoards, reviews, csrfToken: req.csrfToken()})
});

// router.use((req, res, next) => {
//     // console.log('--------ADD RECIPE TO BOARD 1');
//     next();
// });

router.post('/:rId/boards', async (req, res, next) => {
    // console.log('--------ADD RECIPE TO BOARD 2');
    const recipeId = req.params.rId
    const boardId = req.body.addToBoard
    //NOTE query all recipes on a specific board that belong to a user 
    

    const recipesOnSpecificBoard = await db.RecipesOnBoard.findAll({
        where: {
            boardId
        }
    });
   const recipeIdList = recipesOnSpecificBoard.map(recipe => {
        return recipe.recipeId
    })

    if(!recipeIdList.includes(parseInt(recipeId, 10))) {
        let addedRecipe = await db.RecipesOnBoard.create({
        recipeId,
            boardId
        });
        errors = []
    } else {
        errors.push('Recipe is already on this board');

    }
    
    // console.log('BOOLEAN TEST', recipeIdList.includes(recipeId), recipeId) //TRUE
    // console.log("---------------------------------", `recipeIdList: ${recipeIdList}`)
    res.redirect(`/recipes/${recipeId}`)
})

router.use((req, res, next) => {
    console.log('------------------review 1-----');
    next();
})

router.post('/:id/review/add', requireAuth, csrfProtection, asyncHandler(async(req, res, next) => {
    console.log('------------------review 2-----', req.body)
    const { _csrf, reviewbody } = req.body
    console.log(reviewbody);
    const userId = req.session.auth.userId
    db.Review.create({reviewText: reviewbody, recipeId: req.params.id, userId})
    res.redirect('/')
}))


module.exports = router;
