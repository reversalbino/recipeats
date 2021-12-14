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
    title: 'Login'
  });
});


router.post('/login', csrfProtection, function(req, res, next) {

});

router.get('/signup', csrfProtection, (req, res, next) => {
  res.render('signup', {
    csrfToken: req.csrfToken(), 
    title: 'signup'
  });
});





module.exports = router;
