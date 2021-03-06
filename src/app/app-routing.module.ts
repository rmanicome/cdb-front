import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ComputersListComponent } from './computers/routed/computers-list/computers-list.component';
import { CompaniesListComponent } from './companies/routed/companies-list/companies-list.component';

const routes: Routes = [
  {
    path: 'computers',
    component: ComputersListComponent
  },
  {
    path: 'companies',
    component: CompaniesListComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
