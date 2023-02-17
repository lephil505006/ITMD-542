var express = require('express');
var router = express.Router();
//const todosRepo = require('../src/todosMemoryRepository');
const todosRepo = require('../src/todosFileRepository');

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
  const todo = todosRepo.findById(req.params.uuid);
  if (todo) {
    res.render('todo', { title: 'Your Todo', todo: todo })
  }
  else {
    res.redirect('/todos');
  }
  res.render('todo', { title: 'Single Todo' });
});

/* GET delete todo form */
router.get('/:uuid/delete', function (req, res, next) {
  const todo = todosRepo.findById(req.params.uuid);
  res.render('todos_delete', { title: 'Delete Todo', todo: todo });
});

/* POST delete todo  */
router.post('/:uuid/delete', function (req, res, next) {
  todosRepo.deleteById(req.params.uuid);
  res.redirect('/todos');
});

/* GET edit todo form */
router.get('/:uuid/edit', function (req, res, next) {
  const todo = todosRepo.findById(req.params.uuid);
  res.render('todos_edit', { title: 'Edit Todo', todo: todo });
});

/* POST edit todo */
router.post('/:uuid/edit', function (req, res, next) {
  if (req.body.todoText.trim() === '') {
    const todo = todosRepo.findById(req.params.uuid);
    res.render('todos_edit', { title: 'Edit Todo', msg: 'Todo text can not be empty!', todo: todo })
  }
  else {
    const updatedTodo = { id: req.params.uuid, text: req.body.todoText.trim() };
    todosRepo.update(updatedTodo);
    res.redirect(`/todos/${req.params.uuid}`);
  }
});

module.exports = router;
