const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const db = new Map();

//db.set('760f5b3b-09d8-48cb-80c1-63469bf13bb5', { text: 'This is text 1', id: '760f5b3b-09d8-48cb-80c1-63469bf13bb5' });
//db.set('12e4350f-72d3-4996-90d8-cef6c6340c53', { text: 'This is text 2', id: '12e4350f-72d3-4996-90d8-cef6c6340c53' });

const loadData = () => {
    const jsonData = fs.readFileSync(path.join(__dirname, '../data/todos.json'));
    const todosArray = JSON.parse(jsonData);
    todosArray.forEach(element => {
        db.set(element[0], element[1]);
    });
};

const saveData = () => {
    const stringifyData = JSON.stringify(Array.from(db));
    fs.writeFileSync(path.join(__dirname, '../data/todos.json'), stringifyData);
};

const repo = {
    findAll: () => Array.from(db.values()),
    findById: (uuid) => db.get(uuid),
    create: (firstName, lastName) => {
        const newTodo = {
            id: crypto.randomUUID(),
            text: firstName.text,
            text: lastName.text,
        };
        db.set(newTodo.id, newTodo);
        saveData();
    },
    deleteById: (uuid) => {
        db.delete(uuid);
        saveData();
    },
    update: (todo) => {
        db.set(todo.id, todo);
        saveData();
    },
};

loadData();

module.exports = repo;