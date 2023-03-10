const crypto = require('crypto');
const db = new Map();

db.set('760f5b3b-09d8-48cb-80c1-63469bf13bb5', { text: 'This is text 1', id: '760f5b3b-09d8-48cb-80c1-63469bf13bb5' });
db.set('12e4350f-72d3-4996-90d8-cef6c6340c53', { text: 'This is text 2', id: '12e4350f-72d3-4996-90d8-cef6c6340c53' });

const repo = {
    findAll: () => Array.from(db.values()),
    findById: (uuid) => db.get(uuid),
    create: (contact) => {
        const newContact = {
            id: crypto.randomUUID(),
            text: contact.text,
        };
        db.set(newContact.id, newContact);
    },
    deleteById: (uuid) => db.delete(uuid),
    update: (contact) => db.set(contact.id, contact),
};

module.exports = repo;