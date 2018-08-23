import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComputersListComponent } from './computers-list/computers-list.component';
import { SharedModule } from '../../shared/shared.module';
import { ComputersAddComponent } from './computers-add/computers-add.component';
import { ComputersUpdateComponent } from './computers-update/computers-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComputerUpdateComponent } from './computer-update/computer-update.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    ComputersListComponent,
    ComputersAddComponent,
    ComputersUpdateComponent,
    ComputerUpdateComponent
  ]
})
export class ComputersRoutedModule { }
