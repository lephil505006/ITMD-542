const contactsRepo = require('../src/contactsSQLiteRepository');
const Contact = require('../src/Contact');

/* GET users listing. */
exports.contacts_list = async function (req, res, next) {
    const data = contactsRepo.findAll();
    res.render('contacts', { title: 'Contact Database', contacts: data });
};

/* GET create contact form */
exports.contacts_create_get = async function (req, res, next) {
    res.render('contacts_add', { title: 'Add a contacts' });
};

/* POST create contact form */
exports.contacts_create_post = async function (req, res, next) {
    if (req.body.firstName.trim() === '') {
        res.render('contacts_add', { title: 'Add a contacts', msg: 'First Name text can not be empty!' })
    }
    else if (req.body.lastName.trim() === '') {
        res.render('contacts_add', { title: 'Add a contacts', msg: 'Last Name text can not be empty!' })
    }
    else if (req.body.email.trim() === '') {
        res.render('contacts_add', { title: 'Add a contacts', msg: 'Email Address text can not be empty!' })
    }
    else {
        const newContact = new Contact('', req.body.firstName, req.body.lastName, req.body.email);
        contactsRepo.create(newContact);
        res.redirect('/contacts');
    }
};

/* GET single contact form */
exports.contacts_detail = async function (req, res, next) {
    const contact = contactsRepo.findById(req.params.uuid);
    if (contact) {
        res.render('contact', { title: 'Your Todo', contact: contact })
    }
    else {
        res.redirect('/contacts');
    }
    //res.render('contact', { title: 'Single Contact' });
};

/* GET delete contact form */
exports.contacts_delete_get = async function (req, res, next) {
    const contact = contactsRepo.findById(req.params.uuid);
    res.render('contacts_delete', { title: 'Delete contacts', contact: contact });
};

/* POST delete contact form  */
exports.contacts_delete_post = function (req, res, next) {
    contactsRepo.deleteById(req.params.uuid);
    res.redirect('/contacts');
};

/* GET edit contact form */
exports.contacts_edit_get = function (req, res, next) {
    const contact = contactsRepo.findById(req.params.uuid);
    res.render('contacts_edit', { title: 'Edit contacts', contact: contact });
};

/* POST edit contact form */
exports.contacts_edit_post = function (req, res, next) {
    if (req.body.contactFirst.trim() === '') {
        const contact = contactsRepo.findById(req.params.uuid);
        res.render('contacts_edit', { title: 'Edit Todo', msg: 'Todo text can not be empty!', contact: contact })
    }
    else {
        const updatedContact = new Contact(req.params.uuid, req.body.contactFirst.trim(), req.body.contactLast.trim(), req.body.contactEmail.trim());
        contactsRepo.update(updatedContact);
        res.redirect(`/contacts/${req.params.uuid}`);
    }
};