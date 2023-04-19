var express = require('express');
var router = express.Router();

let data = [{ text: 'test', id: '22222' }];

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('recipes', { title: 'Recipe List' });
});

module.exports = router;
