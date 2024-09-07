import ContactColection from '../db/models/Contact.js';

export const getAllContacts = () => ContactColection.find();

export const getContactById = (id) => ContactColection.findById(id);
