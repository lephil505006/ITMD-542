const recipesRepo = require('../src/recipesMongoRepository');
const Recipe = require('../src/Recipe');

/* GET users listing. */
exports.recipes_list = async function (req, res, next) {
    const data = recipesRepo.findAll();
    res.render('recipes', { title: 'recipe Database', recipes: data });
};

/* GET create recipe form */
exports.recipes_create_get = async function (req, res, next) {
    res.render('recipes_add', { title: 'Add a recipes' });
};

/* POST create recipe form */
exports.recipes_create_post = async function (req, res, next) {
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
};

/* GET single recipe form */
exports.recipes_detail = async function (req, res, next) {
    const recipe = await recipesRepo.findById(req.params.uuid);
    if (recipe) {
        res.render('recipe', { title: 'Your Todo', recipe: recipe })
    }
    else {
        res.redirect('/recipes');
    }
    //res.render('recipe', { title: 'Single recipe' });
};

/* GET delete recipe form */
exports.recipes_delete_get = async function (req, res, next) {
    const recipe = await recipesRepo.findById(req.params.uuid);
    res.render('recipes_delete', { title: 'Delete recipes', recipe: recipe });
};

/* POST delete recipe form  */
exports.recipes_delete_post = async function (req, res, next) {
    await recipesRepo.deleteById(req.params.uuid);
    res.redirect('/recipes');
};

/* GET edit recipe form */
exports.recipes_edit_get = async function (req, res, next) {
    const recipe = await recipesRepo.findById(req.params.uuid);
    res.render('recipes_edit', { title: 'Edit recipes', recipe: recipe });
};

/* POST edit recipe form */
exports.recipes_edit_post = async function (req, res, next) {
    if (req.body.recipeDish.trim() === '') {
        const recipe = await recipesRepo.findById(req.params.uuid);
        res.render('recipes_edit', { title: 'Edit Todo', msg: 'Todo text can not be empty!', recipe: recipe })
    }
    else {
        const updatedRecipe = new Recipe(req.params.uuid, req.body.recipeDish.trim(), req.body.recipeOccasion.trim(), req.body.recipeServing.trim(), req.body.recipeDescription.trim(), req.body.recipeInstruction.trim());
        await recipesRepo.update(updatedRecipe);
        res.redirect(`/recipes/${req.params.uuid}`);
    }
};