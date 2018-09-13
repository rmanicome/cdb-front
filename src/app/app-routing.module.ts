import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ComputersListComponent } from './computers/routed/computers-list/computers-list.component';
import { CompaniesListComponent } from './companies/routed/companies-list/companies-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth-guard.service';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
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
