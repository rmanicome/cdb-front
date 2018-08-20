import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComputersListComponent } from './computers-list/computers-list.component';
import { ComputersDetailComponent } from './computers-detail/computers-detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    ComputersListComponent,
    ComputersDetailComponent
  ]
})
export class ComputersRoutedModule { }
