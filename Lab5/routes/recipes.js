var express = require('express');
var router = express.Router();
const recipesController = require('../controllers/recipesController');

/* GET users listing. */
router.get('/', recipesController.recipes_list);

/* GET create recipe form */
router.get('/add', recipesController.recipes_create_get);

/* POST create recipe form */
router.post('/add', recipesController.recipes_create_post);

/* GET single recipe form */
router.get('/:uuid', recipesController.recipes_detail);

/* GET delete recipe form */
router.get('/:uuid/delete', recipesController.recipes_delete_get);

/* POST delete recipe form  */
router.post('/:uuid/delete', recipesController.recipes_delete_post);

/* GET edit recipe form */
router.get('/:uuid/edit', recipesController.recipes_edit_get);

/* POST edit recipe form */
router.post('/:uuid/edit', recipesController.recipes_edit_post);

module.exports = router;
