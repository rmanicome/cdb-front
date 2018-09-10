import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../shared/companies.service';
import { Company } from '../../../shared/models/company.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CompaniesAddComponent } from '../companies-add/companies-add.component';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss']
})
export class CompaniesListComponent implements OnInit {
  companies: Company[];
  search: string;

  constructor(
    private _companiesService: CompaniesService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this._companiesService.getAllCompanies().subscribe(companies => this.companies = companies);
  }

  openAddPage() {
    const dialogRef = this.dialog.open(CompaniesAddComponent);

    dialogRef.afterClosed().subscribe(result => this.companies.push(result));
  }
}
