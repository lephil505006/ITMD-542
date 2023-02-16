var express = require('express');
var router = express.Router();

let data = [
  { text: 'This is text 1', id: '760f5b3b-09d8-48cb-80c1-63469bf13bb5' },
  { text: 'This is text 2', id: '12e4350f-72d3-4996-90d8-cef6c6340c53' }
];

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('todos', { title: 'Lab 2', todos: data });
});

/* GET create todo form CHANGE LATER */
router.get('/add', function (req, res, next) {
  res.render('todos_add', { title: 'Add a Todo' });
});

/* POST create todo CHANGE LATER */
router.post('/add', function (req, res, next) {
  if (req.body.todoText.trim() === '') {
    res.render('todos_add', { title: 'Add a Todo', msg: 'Todo text can not be empty!' })
  }
  else {
    //add todo to database 
    res.redirect('/todos');
  }
});

module.exports = router;
