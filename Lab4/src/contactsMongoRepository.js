//const path = require('path');
//const betterSqlite3 = require('better-sqlite3');
const { MongoClient, ObjectId } = require('mongodb');
const Contact = require('./Contact');

const url = 'mongodb+srv://lephil505006:d83vN9sMM5Db6Mq4@contactlab4.dcmh1rh.mongodb.net/test';
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
        let contacts = [];
        const contactsColl = client.db('lab4-contacts').collection('Lab4');
        const cursor = contactsColl.find({});
        await cursor.forEach(doc => {
            const aContact = new Contact(doc._id.toString(), doc.firstName, doc.lastName, doc.email);
            contacts.push(aContact);
        });
        return contacts;
    },
    findById: async (uuid) => {
        const contactsColl = client.db('lab4-contacts').collection('Lab4');
        const filter = {
            '_id': new ObjectId(uuid)
        };
        const doc = await contactsColl.findOne(filter);
        return new Contact(doc._id.toString(), doc.firstName, doc.lastName, doc.email);
    },
    create: async (contact) => {
        const doc = { firstName: contact.firstName, lastName: contact.lastName, email: contact.email };
        const contactsColl = client.db('lab4-contacts').collection('Lab4');
        const result = await contactsColl.insertOne(doc);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);

    },
    deleteById: async (uuid) => {
        const contactsColl = client.db('lab4-contacts').collection('Lab4');
        const filter = {
            '_id': new ObjectId(uuid)
        };
        const result = await contactsColl.deleteOne(filter);
        if (result.deletedCount === 1) {
            console.log("Successfully deleted a document.");
        }
        else {
            console.log("No documents matched, deleted 0 documents");
        }
    },
    update: async (contact) => {
        const contactsColl = client.db('lab4-contacts').collection('Lab4');
        const filter = {
            '_id': new ObjectId(contact.id)
        };
        const updateDoc = {
            $set: {
                firstName: contact.firstName, lastName: contact.lastName, email: contact.email
            }
        };
        const result = await contactsColl.updateOne(filter, updateDoc);
        console.log(`${result.matchedCount} docs matched the filter, updated ${result.modifiedCount} document(s)`);
    },
};

module.exports = repo;