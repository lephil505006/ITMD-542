var express = require('express');
var router = express.Router();
const todosRepo = require('../src/todosMemoryRepository');

/* GET users listing. */
router.get('/', function (req, res, next) {
  const data = todosRepo.findAll();
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
    //Create one for each contact info 1 50 00
    todosRepo.create({ text: req.body.todoText.trim() });
    res.redirect('/todos');
  }
});

/* GET single todo. */
router.get('/:uuid', function (req, res, next) {
  const data = todosRepo.findAll();
  res.render('todo', { title: 'Single Todo' });
});

module.exports = router;
