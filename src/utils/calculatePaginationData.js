export const calculatePaginationData = ({ count, perPage, page }) => {
  //розрахунок загальної к-сті сторінок
  const totalPages = Math.ceil(count / perPage);
  // чи є наступна сторінка
  const hasNextPage = page < totalPages;
  //  чи є попередня сторінка
  const hasPreviousPage = page !== 1;

  return {
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};
