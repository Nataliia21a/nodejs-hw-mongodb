import { SORT_ORDER } from '../constants/index.js';

export const parseSortParams = ({ sortBy, sortFields, sortOrder }) => {
  const parsedSortBy = sortFields.includes(sortBy) ? sortBy : '_id';
  const parsedOrder = SORT_ORDER.includes(sortOrder)
    ? sortOrder
    : SORT_ORDER[0];
  return {
    sortBy: parsedSortBy,
    sortOrder: parsedOrder,
  };
};
