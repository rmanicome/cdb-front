import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ComputersListComponent } from './computers/routed/computers-list/computers-list.component';
import { CompaniesListComponent } from './companies/routed/companies-list/companies-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'computers',
    component: ComputersListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'companies',
    component: CompaniesListComponent,
    canActivate: [AuthGuard]
  },
  // { path: 'computers', redirectTo: 'login' }
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
