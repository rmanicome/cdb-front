import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CompaniesDetailComponent } from './companies-detail/companies-detail.component';
import { CompaniesAddComponent } from './companies-add/companies-add.component';
import { CompaniesUpdateComponent } from './companies-update/companies-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../shared/filter.pipe';
import { CompaniesComputersTableComponent } from './companies-computers-table/companies-computers-table.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    CompaniesListComponent,
    CompaniesDetailComponent,
    CompaniesAddComponent,
    CompaniesUpdateComponent,
    FilterPipe,
    CompaniesComputersTableComponent
  ],
  exports: [
    FilterPipe
  ],
  entryComponents: [
    CompaniesAddComponent,
    CompaniesUpdateComponent,
    CompaniesComputersTableComponent
  ]
})
export class CompaniesRoutedModule { }
