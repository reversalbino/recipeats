const express = require('express');
const { check, validationResult } = require('express-validator');

const { csrfProtection, asyncHandler } = require('./utils');
const db = require('../db/models'); //db.Model


const router = express.Router();

/* GET users listing. */
//NOTE //users/login
router.get('/login', csrfProtection, function(req, res, next) {
  res.render('login', {
    csrfToken: req.csrfToken(),
    title: 'Recipeats | Login'
  });
});


router.post('/login', csrfProtection, function(req, res, next) {

});

router.get('/signup', csrfProtection, (req, res, next) => {
  const user = db.User.build();
  res.render('signup', {
    title: 'Recipeats | Sign Up',
    user,
    csrfToken: req.csrfToken()
  });
});

const userValidators = [

];

router.post('/signup', csrfProtection, userValidators, asyncHandler(async(req,res) => {
  const {
    username,
    password
  } = req.body;

  const user = db.User.build({
    username
  });

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    await user.save();
    res.redirect('/');
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('signup',{
      title: 'Recipeats | Sign Up',
      user,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}));





module.exports = router;
