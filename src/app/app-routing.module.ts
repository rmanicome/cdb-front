import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ComputersListComponent } from './computers/routed/computers-list/computers-list.component';
import { CompaniesListComponent } from './companies/routed/companies-list/companies-list.component';
import { ComputersAddComponent } from './computers/routed/computers-add/computers-add.component';
import { ComputersUpdateComponent } from './computers/routed/computers-update/computers-update.component';

const routes: Routes = [
  {
    path: 'computers',
    component: ComputersListComponent
  },
  {
    path: 'computers/addComputer',
    component: ComputersAddComponent
  },
  {
    path: 'computers/:id',
    component: ComputersUpdateComponent
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
