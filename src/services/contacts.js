import ContactColection from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getContacts = async ({
  perPage,
  page,
  sortBy = '_id',
  sortOrder = SORT_ORDER[0],
  filter = {},
}) => {
  const skip = (page - 1) * perPage;

  //contactQuery - об"єкт запиту до бази
  const contactQuery = ContactColection.find();

  if (filter.contactType) {
    contactQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavourite) {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

  if (filter.userId) {
    contactQuery.where('userId').equals(filter.userId);
  }

  const contacts = await contactQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  // count - кількість об"єктів в базі
  const count = await ContactColection.find()
    .merge(contactQuery)
    .countDocuments();

  const paginationData = calculatePaginationData({ count, perPage, page });
  return {
    page,
    perPage,
    contacts,
    totalItems: count,
    ...paginationData,
  };
};

export const getContactById = (filter) => ContactColection.findById(filter);

export const createContact = (payload) => ContactColection.create(payload);

export const updateContact = async (filter, data, options = {}) => {
  const rawResult = await ContactColection.findOneAndUpdate(filter, data, {
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
