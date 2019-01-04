import {Directive, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges} from '@angular/core';
import {Subscription} from 'rxjs';

import {ColumnSort} from './interfaces/column-sort.interface';
import {NgTableSortableService} from './ng-table-sortable.service';

@Directive({
  selector: '[sortable-table]',
  providers: [NgTableSortableService]
})
export class NgTableSortableDirective implements OnChanges, OnDestroy {
  private columnSortedSubscription: Subscription;

  @Input('sortable-table') sortingList: string[] = [];

  @Output() sorted = new EventEmitter<ColumnSort[]>();

  constructor(private sortableService: NgTableSortableService) {
    this.columnSortedSubscription = this.sortableService.columnSorted$.subscribe(
      (columns: ColumnSort[]) => {
        this.sorted.emit(columns);
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateSortingList();
  }

  ngOnDestroy(): void {
    this.columnSortedSubscription.unsubscribe();
  }

  private updateSortingList() {
    this.sortableService.cleanSortColumns();
    if (this.sortingList.length) {
      this.sortingList.forEach(
        (sort: string) => {
          this.sortableService.addSortColumn(this.formatSortString(sort));
        }
      );
    }
    this.sortableService.updateSortColumns();
  }

  private formatSortString(sort: string): ColumnSort {
    const column: ColumnSort = {
      sortColumn: sort,
      sortDirection: 'asc'
    };
    if (column.sortColumn[0] === '-') {
      column.sortDirection = 'desc';
      column.sortColumn = sort.substr(1);
    }
    return column;
  }
}
