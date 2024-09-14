import ContactColection from '../db/models/Contact.js';

export const getAllContacts = () => ContactColection.find();

export const getContactById = (id) => ContactColection.findById(id);

export const createContact = (payload) => ContactColection.create(payload);

export const updateContact = async (filter, data, options = {}) => {
  const rawResult = await ContactColection.findOneAndUpdate(filter, data, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject?.upserted),
  };
};

export const deleteContact = (filter) =>
  ContactColection.findOneAndDelete(filter);
