const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const db = new Map();
const Contact = require('./Contact');

const loadData = () => {
    const jsonData = fs.readFileSync(path.join(__dirname, '../data/contacts.json'));
    const contactsArray = JSON.parse(jsonData);
    contactsArray.forEach(element => {
        const aContact = new Contact(element[1].id, element[1].firstName, element[1].lastName, element[1].email);
        db.set(aContact.id, aContact);
    });
    console.log(db);
};

const saveData = () => {
    const stringifyData = JSON.stringify(Array.from(db));
    fs.writeFileSync(path.join(__dirname, '../data/contacts.json'), stringifyData);
};

const repo = {
    findAll: () => Array.from(db.values()),
    findById: (uuid) => db.get(uuid),
    create: (contact) => {
        contact.id = crypto.randomUUID();
        db.set(contact.id, contact);
        saveData();
    },
    deleteById: (uuid) => {
        db.delete(uuid);
        saveData();
    },
    update: (contact) => {
        db.set(contact.id, contact);
        saveData();
    },
};

loadData();

module.exports = repo;