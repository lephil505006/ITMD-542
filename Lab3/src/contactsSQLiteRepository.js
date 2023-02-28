const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const betterSqlite3 = require('better-sqlite3');

const db = new betterSqlite3(path.join(__dirname, '../data/contacts.sqlite'), { verbose: console.log });

const createStmt = db.prepare("CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT)");
createStmt.run();

//const loadData = () => {
//const jsonData = fs.readFileSync(path.join(__dirname, '../data/contacts.json'));
//const contactsArray = JSON.parse(jsonData);
//contactsArray.forEach(element => {
// db.set(element[0], element[1]);
// });
//};

//const saveData = () => {
//const stringifyData = JSON.stringify(Array.from(db));
//fs.writeFileSync(path.join(__dirname, '../data/contacts.json'), stringifyData);
//};

const repo = {
    findAll: () => {
        return [];
    },
    findById: (uuid) => {
        return {};
    },
    create: (contact1, contact2, contact3) => {
        //(code for time but editing caused errors) const date = fs.statSync(path.join(__dirname, '../data/contacts.json'));
        const newContact = {
            //id: crypto.randomUUID(),
            //firstName: contact1.text,
            //lastName: contact2.text,
            //email: contact3.text,
        };
        //db.set(newContact.id, newContact);
        //saveData();
    },
    deleteById: (uuid) => {
        //db.delete(uuid);
        //saveData();
    },
    update: (contact) => {
        //db.set(contact.id, contact);
        //saveData();
    },
};

module.exports = repo;