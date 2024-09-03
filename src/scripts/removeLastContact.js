import { PATH_DB } from '../constants/contacts.js';
import { getAllContacts } from '../utils/getAllContacts.js';
import fs from 'node:fs/promises';

export const removeLastContact = async () => {
  const allContacts = await getAllContacts();
  allContacts.pop();
  await fs.writeFile(PATH_DB, JSON.stringify(allContacts, null, 2));
};

removeLastContact();
