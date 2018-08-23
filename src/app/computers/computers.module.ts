import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComputersRoutedModule } from './routed/computers-routed.module';
import { ComputersRoutingModule } from './routed/computers-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ComputersRoutedModule,
    ComputersRoutingModule
  ],
  declarations: []
})
export class ComputersModule { }
