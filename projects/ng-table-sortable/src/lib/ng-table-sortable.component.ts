import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {NgTableSortableService} from './ng-table-sortable.service';
import {ColumnSort} from './interfaces/column-sort.interface';

@Component({
  selector: '[sortable-column]',
  templateUrl: './ng-table-sortable.component.html',
  styleUrls: ['./ng-table-sortable.component.less']
})
export class NgTableSortableComponent implements OnInit, OnDestroy {
  private columnSortedSubscription: Subscription;
  sortDirection = '';

  @Input('sortable-column') columnName: string;
  @Input('sort-disabled') sortDisabled = false;

  @HostListener('click', ['$event']) sort(event) {
    if (!this.sortDisabled) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      this.sortableService.columnSorted({
        sortColumn: this.columnName, sortDirection: this.sortDirection
      }, event.ctrlKey);
    }
  }

  constructor(private sortableService: NgTableSortableService) {}

  ngOnInit() {
    if (!this.sortDisabled) {
      this.onChangeColumns(this.sortableService.getSortColumns());
      this.columnSortedSubscription = this.sortableService.columnSorted$.subscribe(this.onChangeColumns.bind(this));
    }
  }

  ngOnDestroy(): void {
    if (this.columnSortedSubscription) {
      this.columnSortedSubscription.unsubscribe();
    }
  }

  onChangeColumns(columns: ColumnSort[]): void {
    const currentColumn: ColumnSort = columns.find((column: ColumnSort) => this.columnName === column.sortColumn);
    if (currentColumn) {
      this.sortDirection = currentColumn.sortDirection;
    } else {
      this.sortDirection = '';
    }
  }
}
