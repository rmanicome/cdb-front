import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    CompaniesListComponent
  ]
})
export class CompaniesRoutedModule { }
