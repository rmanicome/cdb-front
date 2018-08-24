import { Component, OnInit, Input } from '@angular/core';
import { Company } from '../../../shared/models/company.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ComputersTableComponent } from '../../../computers/routed/computers-table/computers-table.component';
import { ComputersService } from '../../../computers/shared/computers.service';
import { CompaniesUpdateComponent } from '../companies-update/companies-update.component';

@Component({
  selector: 'app-companies-detail',
  templateUrl: './companies-detail.component.html',
  styleUrls: ['./companies-detail.component.scss']
})
export class CompaniesDetailComponent implements OnInit {
  @Input() company: Company;

  constructor(
    private _computerService: ComputersService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  openUpdate() {
    const dialogRef = this.dialog.open(CompaniesUpdateComponent);
  }

  showComputers() {
    this.dialog.open(ComputersTableComponent, {
      data: { }
    });
  }

  doDelete() {

  }
}
