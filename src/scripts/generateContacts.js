import fs from 'node:fs/promises';
import { PATH_DB } from '../constants/contacts.js';
import { createFakeContact } from '../utils/createFakeContact.js';

const generateContacts = async (number) => {
  const contactsList = JSON.parse(await fs.readFile(PATH_DB, 'utf-8'));

  const newContactsList = Array(number)
    .fill(0)
    .map(() => createFakeContact());

  contactsList.push(...newContactsList);
  //   const allContacts = [...contactsList, ...newContactsList];
  //   console.log(allContacts);

  await fs.writeFile(PATH_DB, JSON.stringify(contactsList, null, 2));
};

generateContacts(2);
