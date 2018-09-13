import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Computer } from '../../../shared/models/computer.model';

@Component({
  selector: 'app-companies-computers-table',
  templateUrl: './companies-computers-table.component.html',
  styleUrls: ['./companies-computers-table.component.scss']
})
export class CompaniesComputersTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'introduced', 'discontinued', 'company'];
  dataSource: Computer[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public currentDialog: MatDialogRef<CompaniesComputersTableComponent>
  ) { }

  ngOnInit() {
    this.dataSource = this.data.computers;
  }
}
