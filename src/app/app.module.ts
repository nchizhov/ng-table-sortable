import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgTableSortableModule} from '../../projects/ng-table-sortable/src/lib/ng-table-sortable.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgTableSortableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
