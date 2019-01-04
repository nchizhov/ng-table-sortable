import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

import {ColumnSort} from './interfaces/column-sort.interface';

@Injectable()
export class NgTableSortableService {
  private columnsList: ColumnSort[] = [];
  private columnSortedSource = new Subject<ColumnSort[]>();

  columnSorted$ = this.columnSortedSource.asObservable();

  columnSorted(column: ColumnSort, append: boolean) {
    if (append) {
      const index: number = this.columnsList.findIndex((evt: ColumnSort) => evt.sortColumn === column.sortColumn);
      if (index > -1) {
        this.columnsList.splice(index, 1);
      }
      this.columnsList.push(column);
    } else {
      this.columnsList = [column];
    }
    this.columnSortedSource.next(this.columnsList);
  }

  cleanSortColumns() {
    this.columnsList = [];
  }

  addSortColumn(column: ColumnSort) {
    this.columnsList.push(column);
  }

  updateSortColumns() {
    this.columnSortedSource.next(this.columnsList);
  }

  getSortColumns(): ColumnSort[] {
    return [...this.columnsList];
  }
}
