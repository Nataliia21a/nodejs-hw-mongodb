import { PATH_DB } from '../constants/contacts.js';
import fs from 'node:fs/promises';
import { createFakeContact } from '../utils/createFakeContact.js';
import { getAllContacts } from '../utils/getAllContacts.js';
export const addOneContact = async () => {
  const allContacts = await getAllContacts();

  const newcontact = createFakeContact();
  allContacts.push(newcontact);

  await fs.writeFile(PATH_DB, JSON.stringify(allContacts, null, 2), 'utf-8');
};

addOneContact();
