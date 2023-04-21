var express = require('express');
var router = express.Router();
const recipesRepo = require('../src/recipesFileRepository');

/* GET users listing. */
router.get('/', function (req, res, next) {
    const data = recipesRepo.findAll();
    res.render('recipes', { title: 'recipe Database', recipes: data });
});

/* GET create recipe form */
router.get('/add', function (req, res, next) {
    res.render('recipes_add', { title: 'Add a recipes' });
});

/* POST create recipe form */
router.post('/add', function (req, res, next) {
    if (req.body.dishName.trim() === '') {
        res.render('recipes_add', { title: 'Add a recipes', msg: 'Dish Name text can not be empty!' })
    }
    else if (req.body.occasion.trim() === '') {
        res.render('recipes_add', { title: 'Add a recipes', msg: 'Occasion text can not be empty!' })
    }
    else if (req.body.instruction.trim() === '') {
        res.render('recipes_add', { title: 'Add a recipes', msg: 'Instruction text can not be empty!' })
    }
    else {
        recipesRepo.create({ text: req.body.dishName.trim() }, { text: req.body.occasion.trim() }, { text: req.body.serving.trim() }, { text: req.body.description.trim() }, { text: req.body.instruction.trim() });
        res.redirect('/recipes');
    }
});

/* GET single recipe form */
router.get('/:uuid', function (req, res, next) {
    const recipe = recipesRepo.findById(req.params.uuid);
    if (recipe) {
        res.render('recipe', { title: 'Your Todo', recipe: recipe })
    }
    else {
        res.redirect('/recipes');
    }
    res.render('recipe', { title: 'Single recipe' });
});

/* GET delete recipe form */
router.get('/:uuid/delete', function (req, res, next) {
    const recipe = recipesRepo.findById(req.params.uuid);
    res.render('recipes_delete', { title: 'Delete recipes', recipe: recipe });
});

/* POST delete recipe form  */
router.post('/:uuid/delete', function (req, res, next) {
    recipesRepo.deleteById(req.params.uuid);
    res.redirect('/recipes');
});

/* GET edit recipe form */
router.get('/:uuid/edit', function (req, res, next) {
    const recipe = recipesRepo.findById(req.params.uuid);
    res.render('recipes_edit', { title: 'Edit recipes', recipe: recipe });
});

/* POST edit recipe form */
router.post('/:uuid/edit', function (req, res, next) {
    if (req.body.recipeDish.trim() === '') {
        const recipe = recipesRepo.findById(req.params.uuid);
        res.render('recipes_edit', { title: 'Edit Todo', msg: 'Todo text can not be empty!', recipe: recipe })
    }
    else {
        const updatedRecipe = { id: req.params.uuid, dishName: req.body.recipeDish.trim(), occasion: req.body.recipeOccasion.trim(), serving: req.body.recipeServing.trim(), description: req.body.recipeDescription.trim(), instruction: req.body.recipeInstruction.trim() };
        recipesRepo.update(updatedRecipe);
        res.redirect(`/recipes/${req.params.uuid}`);
    }
});

module.exports = router;
