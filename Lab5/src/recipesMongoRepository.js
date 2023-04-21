const { MongoClient, ObjectId } = require('mongodb');
const Recipe = require('./Recipe');

const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

async function run() {
    await client.connect();
    return 'Connected to the MongoDB server...'
}

run()
    .then(console.log)
    .catch(console.error);

const repo = {
    findAll: async () => {
        let recipes = [];
        const recipesColl = client.db('recipeDatabase').collection('recipes');
        const cursor = recipesColl.find({});
        await cursor.forEach(doc => {
            const aRecipe = new Recipe(doc._id.toString(), doc.dishName, doc.occasion, doc.serving, doc.description, doc.instruction);
            recipes.push(aRecipe);
        });
        return recipes;
    },
    findById: async (uuid) => {
        const recipesColl = client.db('recipeDatabase').collection('recipes');
        const filter = {
            '_id': new ObjectId(uuid)
        };
        const doc = await recipesColl.findOne(filter);
        return new Recipe(doc._id.toString(), doc.dishName, doc.occasion, doc.serving, doc.description, doc.instruction);
    },
    create: async (recipe) => {
        const doc = { dishName: recipe.dishName, occasion: recipe.occasion, serving: recipe.serving, description: recipe.description, instruction: recipe.instruction };
        const recipesColl = client.db('recipeDatabase').collection('recipes');
        const result = await recipesColl.insertOne(doc);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    },
    deleteById: async (uuid) => {
        const recipesColl = client.db('recipeDatabase').collection('recipes');
        const filter = {
            '_id': new ObjectId(uuid)
        };
        const result = await recipesColl.deleteOne(filter);
        if (result.deletedCount === 1) {
            console.log("Successfully deleted a document.");
        }
        else {
            console.log("No documents matched, deleted 0 documents");
        }
    },
    update: async (recipe) => {
        const recipesColl = client.db('recipeDatabase').collection('recipes');
        const filter = {
            '_id': new ObjectId(recipe.id)
        };
        const updateDoc = {
            $set: {
                dishName: recipe.dishName, occasion: recipe.occasion, serving: recipe.serving, description: recipe.description, instruction: recipe.instruction
            }
        };
        const result = await recipesColl.updateOne(filter, updateDoc);
        console.log(`${result.matchedCount} docs matched the filter, updated ${result.modifiedCount} document(s)`);
    },
};

module.exports = repo;