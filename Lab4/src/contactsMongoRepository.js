//const path = require('path');
//const betterSqlite3 = require('better-sqlite3');
const { MongoClient } = require('mongodb');
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

//const db = new betterSqlite3(path.join(__dirname, '../data/contacts.sqlite'), { verbose: console.log });

//const createStmt = db.prepare("CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, email TEXT)");
//createStmt.run();

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
    findById: (uuid) => {
        // const stmt = db.prepare("SELECT * FROM contacts WHERE id = ?");
        // const row = stmt.get(uuid);
        // return new Contact(row.id, row.firstName, row.lastName, row.email);
    },
    create: (contact) => {
        // const stmt = db.prepare("INSERT INTO contacts (firstName, lastName, email) VALUES (?,?,?)");
        // const info = stmt.run(contact.firstName, contact.lastName, contact.email);
        // console.log(`Contact created with id: ${info.lastInsertRowid}`);
    },
    deleteById: (uuid) => {
        // const stmt = db.prepare("DELETE FROM contacts WHERE id = ?");
        // const info = stmt.run(uuid);
        // console.log(`rows affected: ${info.changes}`);
    },
    update: (contact) => {
        // const stmt = db.prepare("UPDATE contacts SET firstName = ?, lastName = ?, email = ? WHERE id = ?");
        // const info = stmt.run(contact.firstName, contact.lastName, contact.email, contact.id);
        // console.log(`rows affected: ${info.changes}`);
    },
};

module.exports = repo;