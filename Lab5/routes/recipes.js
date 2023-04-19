var express = require('express');
var router = express.Router();
const recipesController = require('../controllers/recipeController')

/* GET users listing. */
router.get('/', recipesController.recipes_list);

/* GET create contact form */
router.get('/add', recipesController.recipes_create_get);

/* POST create contact form */
router.post('/add', recipesController.recipes_create_post);

/* GET single contact form */
router.get('/:uuid', recipesController.recipes_detail);

/* GET delete contact form */
router.get('/:uuid/delete', recipesController.recipes_delete_get);

/* POST delete contact form  */
router.post('/:uuid/delete', recipesController.recipes_delete_post);

/* GET edit contact form */
router.get('/:uuid/edit', recipesController.recipes_edit_get);

/* POST edit contact form */
router.post('/:uuid/edit', recipesController.recipes_edit_post);

module.exports = router;