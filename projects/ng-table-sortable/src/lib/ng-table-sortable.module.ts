import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { NgTableSortableComponent } from './ng-table-sortable.component';
import {NgTableSortableDirective} from './ng-table-sortable.directive';

@NgModule({
  declarations: [
    NgTableSortableComponent,
    NgTableSortableDirective
  ],
  imports: [
    CommonModule
  ],
  providers: [],
  exports: [
    NgTableSortableComponent,
    NgTableSortableDirective
  ]
})
export class NgTableSortableModule { }
