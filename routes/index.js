const express = require('express');
const router = express.Router();
//test

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'a/A Express Skeleton Home' });
});

module.exports = router;
