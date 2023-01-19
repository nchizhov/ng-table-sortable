import {Component, OnInit} from '@angular/core';

import {DataModel} from './models/data.model';
import {ColumnSort} from '../../projects/ng-table-sortable/src/lib/interfaces/column-sort.interface';
import {sortTableData} from '../../projects/ng-table-sortable/src/lib/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  data: DataModel[];
  mainData: DataModel[];
  data2: DataModel[];
  mainData2: DataModel[];
  sortOrder: string[] = ['-id'];
  sortOrder2: string[] = ['id'];

  ngOnInit(): void {
    this.data = [
      new DataModel(1, 'Nike4', '2019-01-03'),
      new DataModel(11, 'Nike4', '2019-01-03'),
      new DataModel(2, 'Nike2', '2018-01-01'),
      new DataModel(3, 'Nike3', '2018-01-22'),
      new DataModel(4, 'Iren1', '2019-01-01'),
      new DataModel(5, 'Alexander', '2019-02-22')
    ];
    this.mainData = [...this.data];
    this.data2 = [
      new DataModel(1, 'Nike4', '2019-01-03'),
      new DataModel(11, 'Nike4', '2019-01-03'),
      new DataModel(2, 'Nike2', '2018-01-01'),
      new DataModel(3, 'Nike3', '2018-01-22'),
      new DataModel(4, 'Iren1', '2019-01-01'),
      new DataModel(5, 'Alexander', '2019-02-22')
    ];
    this.mainData2 = [...this.data2];
  }

  onSorted(event: ColumnSort[]): void {
    if (event.length) {
      this.data.sort(sortTableData(event));
    } else {
      this.data = [...this.mainData];
    }
  }

  onSorted2(event: ColumnSort[]): void {
    if (event.length) {
      this.data2.sort(sortTableData(event));
    } else {
      this.data2 = [...this.mainData2];
    }
  }

  onChangeSort(): void {
    this.sortOrder = ['name', 'id'];
  }

  onChangeSort2(): void {
    this.sortOrder2 = ['name', 'id'];
  }

  onResort(): void {
    this.sortOrder = [...this.sortOrder];
  }

  onResort2(): void {
    this.sortOrder2 = [...this.sortOrder2];
  }

  onSortReset(): void {
    this.sortOrder = [];
  }

  onSortReset2(): void {
    this.sortOrder2 = [];
  }
}
