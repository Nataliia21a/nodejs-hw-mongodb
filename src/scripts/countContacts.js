// import { PATH_DB } from '../constants/contacts.js';
import { getAllContacts } from '../utils/getAllContacts.js';

export const countContacts = async () => {
  const allContacts = await getAllContacts();
  return allContacts.length;
};

console.log(await countContacts());
