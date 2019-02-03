import {ColumnSort} from './interfaces/column-sort.interface';

export const sortTableData = (sorts: ColumnSort[]) => {
  return function (obj1, obj2) {
    let i = 0;
    let result = 0;
    const numberOfSorts = sorts.length;

    while (result === 0 && i < numberOfSorts) {
      result = sortLine(sorts[i])(obj1, obj2);
      i++;
    }
    return result;
  };
};

const sortLine = (sort: ColumnSort) => {
  const sortOrder = (sort.sortDirection === 'asc') ? 1 : -1;
  return function(a, b) {
    const columnA = a[sort.sortColumn];
    const columnB = b[sort.sortColumn];
    if (columnA === columnB) {
      return 0;
    }
    if (columnA === null) {
      return sortOrder;
    }
    if (columnB === null) {
      return -1 * sortOrder;
    }
    if (typeof columnA === 'string') {
      return columnA.localeCompare(columnB) * sortOrder;
    }
    const result = (columnA < columnB) ? -1 : (columnA > columnB) ? 1 : 0;
    return result * sortOrder;
  };
};
