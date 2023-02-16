var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('todos', { title: 'Lab 2' });
});

module.exports = router;
