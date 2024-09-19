const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;
  const isContactType = (contactType) =>
    ['work', 'home', 'personal'].includes(contactType);

  if (isContactType(contactType)) return contactType;
};

const parseIsFavourite = (isFavourite) => {
  const isString = typeof isFavourite === 'string';
  if (!isString) return;
  const isHasIsFavourite = (isFavourite) =>
    ['true', 'false'].includes(isFavourite);
  if (isHasIsFavourite(isFavourite)) return isFavourite;
};
// const parseIsFavourite = (isFavourite) => {
//     const isString = typeOf isFavourite === "string";
//     if (!isString) return;

// }

export const parseContactsFilterParams = (query) => {
  const { contactType, isFavourite } = query;
  const parsedContactType = parseContactType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
