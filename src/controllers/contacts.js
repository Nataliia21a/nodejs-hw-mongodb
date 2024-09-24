import createHttpError from 'http-errors';
import {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import { parsPaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { sortFields } from '../db/models/Contact.js';
import { parseContactsFilterParams } from '../utils/filters/parseContactsFilterParams.js';

export const getAllContactsController = async (req, res, next) => {
  const { perPage, page } = parsPaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams({ ...req.query, sortFields });
  const filter = parseContactsFilterParams(req.query);
  // логіка відображення контаків відповідно до id користувача, котрий їх додав - додаємо const { _id: userId } = req.user у filter
  const { _id: userId } = req.user;

  const data = await getContacts({
    perPage,
    page,
    sortBy,
    sortOrder,
    filter: { ...filter, userId },
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const data = await getContactById({ _id: id, userId });

  if (!data) {
    throw createHttpError(404, `Contact with id ${id} is not found`);
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data,
  });
};

export const addContactController = async (req, res, next) => {
  console.log('user', req.user);

  const { _id: userId } = req.user;
  const data = await createContact({ ...req.body, userId });

  await res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const upsertContactController = async (req, res, next) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const { isNew, data } = await updateContact({ _id: id, userId }, req.body, {
    upsert: true,
  });

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status: status,
    message: 'Successfully upsert a contact!',
    data,
  });
};

export const patchContactController = async (req, res, next) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const result = await updateContact({ _id: id, userId }, req.body);

  if (!result) {
    throw createHttpError(404, `Contact with id ${id} is not found`);
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.data,
  });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const data = await deleteContact({ _id: id, userId });

  if (!data) {
    throw createHttpError(404, `Contact with id ${id} is not found`);
  }

  res.status(204).send();
};
