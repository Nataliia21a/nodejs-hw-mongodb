import createHttpError from 'http-errors';
import { getAllContacts, getContactById } from '../services/contacts.js';

export const getAllContactsController = async (req, res, next) => {
  const data = await getAllContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { id } = req.params;
  const data = await getContactById(id);

  if (!data) {
    throw createHttpError(404, `Contact with id ${id} is not found`);
    //   const error = new Error(`Contact with id ${id} is not found`);
    //   error.status = 404;
    //   throw error;
  }
  //   return res.status(404).json({
  //     message: `Contact with id ${id} is not found`,
  //   });

  res.json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data,
  });
};
