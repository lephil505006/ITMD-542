var express = require('express');
var router = express.Router();
const contactsRepo = require('../src/contactsFileRepository');

/* GET users listing. */
router.get('/', function (req, res, next) {
  const data = contactsRepo.findAll();
  res.render('contacts', { title: 'Contact Database', contacts: data });
});

/* GET create todo form CHANGE LATER */
router.get('/add', function (req, res, next) {
  res.render('contacts_add', { title: 'Add a contacts' });
});

/* POST create todo CHANGE LATER */
router.post('/add', function (req, res, next) {
  if (req.body.firstName.trim() === '') {
    res.render('contacts_add', { title: 'Add a contacts', msg: 'First Name text can not be empty!' })
  }
  else if (req.body.lastName.trim() === '') {
    res.render('contacts_add', { title: 'Add a contacts', msg: 'Last Name text can not be empty!' })
  }
  else if (req.body.email.trim() === '') {
    res.render('contacts_add', { title: 'Add a contacts', msg: 'Email Address text can not be empty!' })
  }
  else {
    //Create one for each contact info 1 50 00
    contactsRepo.create({ text: req.body.firstName.trim() }, { text: req.body.lastName.trim() }, { text: req.body.email.trim() });
    res.redirect('/contacts');
  }
});

/* GET single todo. */
router.get('/:uuid', function (req, res, next) {
  const contact = contactsRepo.findById(req.params.uuid);
  if (contact) {
    res.render('contact', { title: 'Your Todo', contact: contact })
  }
  else {
    res.redirect('/contacts');
  }
  res.render('contact', { title: 'Single Contact' });
});

/* GET delete todo form */
router.get('/:uuid/delete', function (req, res, next) {
  const contact = contactsRepo.findById(req.params.uuid);
  res.render('contacts_delete', { title: 'Delete contacts', contact: contact });
});

/* POST delete todo  */
router.post('/:uuid/delete', function (req, res, next) {
  contactsRepo.deleteById(req.params.uuid);
  res.redirect('/contacts');
});

/* GET edit todo form */
router.get('/:uuid/edit', function (req, res, next) {
  const contact = contactsRepo.findById(req.params.uuid);
  res.render('contacts_edit', { title: 'Edit contacts', contact: contact });
});

/* POST edit todo */
router.post('/:uuid/edit', function (req, res, next) {
  if (req.body.contactText.trim() === '') {
    const contact = contactsRepo.findById(req.params.uuid);
    res.render('contacts_edit', { title: 'Edit Todo', msg: 'Todo text can not be empty!', contact: contact })
  }
  else {
    const updatedContact = { id: req.params.uuid, text: req.body.contactText.trim() };
    contactsRepo.update(updatedContact);
    res.redirect(`/contacts/${req.params.uuid}`);
  }
});

module.exports = router;
