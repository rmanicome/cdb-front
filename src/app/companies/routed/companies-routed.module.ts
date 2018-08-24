import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CompaniesDetailComponent } from './companies-detail/companies-detail.component';
import { CompaniesAddComponent } from './companies-add/companies-add.component';
import { CompaniesUpdateComponent } from './companies-update/companies-update.component';
import { ReactiveFormsModule } from '@angular/forms';

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
    CompaniesUpdateComponent
  ],
  entryComponents: [
    CompaniesAddComponent,
    CompaniesUpdateComponent
  ]
})
export class CompaniesRoutedModule { }
