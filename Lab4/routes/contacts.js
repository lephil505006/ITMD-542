var express = require('express');
var router = express.Router();
const contactsController = require('../controllers/todoController')

/* GET users listing. */
router.get('/', contactsController.contacts_list);

/* GET create contact form */
router.get('/add', contactsController.contacts_create_get);

/* POST create contact form */
router.post('/add', contactsController.contacts_create_post);

/* GET single contact form */
router.get('/:uuid', contactsController.contacts_detail);

/* GET delete contact form */
router.get('/:uuid/delete', contactsController.contacts_delete_get);

/* POST delete contact form  */
router.post('/:uuid/delete', contactsController.contacts_delete_post);

/* GET edit contact form */
router.get('/:uuid/edit', contactsController.contacts_edit_get);

/* POST edit contact form */
router.post('/:uuid/edit', contactsController.contacts_edit_post);

module.exports = router;
