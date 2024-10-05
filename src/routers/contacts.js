import { Router } from 'express';
import {
  getAllContactsController,
  getContactByIdController,
  addContactController,
  upsertContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  contactAddSchema,
  contactPatchSchema,
} from '../validation/contacts.js';

import { isValidId } from '../middlewares/isValidId.js';

import authenticate from '../middlewares/authenticate.js';
import upload from '../middlewares/upload.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get('/:id', isValidId, ctrlWrapper(getContactByIdController));

// upload.fields([{name: "photo", maxCount: 1}, {name: "prevPhoto", maxCount: 2}]) очікуємо кілька файлів в різних полях
//upload.array("photo", 8) - означає, що в поле "photo" може прийти одночасно до 8 файлів
contactsRouter.post(
  '/',
  upload.single('photo'),
  validateBody(contactAddSchema),
  ctrlWrapper(addContactController),
);

contactsRouter.put(
  '/:id',
  isValidId,
  upload.single('photo'),
  validateBody(contactAddSchema),
  ctrlWrapper(upsertContactController),
);

contactsRouter.patch(
  '/:id',
  isValidId,
  upload.single('photo'),
  validateBody(contactPatchSchema),
  ctrlWrapper(patchContactController),
);

contactsRouter.delete('/:id', isValidId, ctrlWrapper(deleteContactController));

export default contactsRouter;
