const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const db = new Map();

const { MongoClient, ObjectId } = require('mongodb');
const Recipe = require('./Recipe');

const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

async function run() {
    await client.connect();
    return 'Connected to the MongoDB server...'
}

const loadData = () => {
    const jsonData = fs.readFileSync(path.join(__dirname, '../data/recipes.json'));
    const recipesArray = JSON.parse(jsonData);
    recipesArray.forEach(element => {
        db.set(element[0], element[1]);
    });
};

const saveData = () => {
    const stringifyData = JSON.stringify(Array.from(db));
    fs.writeFileSync(path.join(__dirname, '../data/recipes.json'), stringifyData);
};

const repo = {
    findAll: () => Array.from(db.values()),
    findById: (uuid) => db.get(uuid),
    create: (recipe1, recipe2, recipe3, recipe4, recipe5) => {
        const newRecipe = {
            id: crypto.randomUUID(),
            dishName: recipe1.text,
            occasion: recipe2.text,
            serving: recipe3.text,
            description: recipe4.text,
            instruction: recipe5.text,
        };
        db.set(newRecipe.id, newRecipe);
        saveData();
    },
    deleteById: (uuid) => {
        db.delete(uuid);
        saveData();
    },
    update: (recipe) => {
        db.set(recipe.id, recipe);
        saveData();
    },
};

loadData();

module.exports = repo;