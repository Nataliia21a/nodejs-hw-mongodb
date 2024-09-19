const parseNumber = (number, defaultValue) => {
  // значення perPage надсилаються у форматі рядка, тому якщо typeof perPage не дорівнюють string то perPage просто немає (не передали)
  if (typeof number !== 'string') {
    return defaultValue;
  }
  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) {
    return defaultValue;
  }
  return parsedNumber;
};

export const parsPaginationParams = ({ perPage, page }) => {
  const parsedPerPage = parseNumber(perPage, 10);
  const parsedPage = parseNumber(page, 1);
  return {
    perPage: parsedPerPage,
    page: parsedPage,
  };
};
