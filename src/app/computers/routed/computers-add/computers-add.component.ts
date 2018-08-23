import { Component, OnInit } from '@angular/core';
import { ComputersService } from '../../shared/computers.service';
import { CompaniesService } from '../../../companies/shared/companies.service';
import { Company } from '../../../shared/models/company.model';
import { Computer } from '../../../shared/models/computer.model';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-computers-add',
  templateUrl: './computers-add.component.html',
  styleUrls: ['./computers-add.component.scss']
})
export class ComputersAddComponent implements OnInit {
  computer = new Computer();
  introducedDate: Date;
  discontinuedDate: Date;
  companyId: number;
  companies: Company[];
  name = new FormControl('', [Validators.required]);
  today = new Date();

  constructor(
    public dialogRef: MatDialogRef<ComputersAddComponent>,
    private _computerService: ComputersService,
    private _companyService: CompaniesService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.today.setDate(this.today.getDate() - 1);
    this._companyService.getAllCompanies().subscribe(companies => this.companies = companies);
  }

  sendForm() {
    if (!this.name.hasError('required')) {
      if (this.companyId != null) {
        this._companyService.getById(this.companyId.toString()).subscribe(company => this.computer.company = company);
      }

      if (this.introducedDate != null) {
        this.introducedDate.setDate(this.introducedDate.getDate() + 1);
        this.computer.introducedDate = this.introducedDate.toJSON().substring(0, 10);
      }

      if (this.discontinuedDate != null) {
        this.discontinuedDate.setDate(this.discontinuedDate.getDate() + 1);
        this.computer.discontinuedDate = this.discontinuedDate.toJSON().substring(0, 10);
      }

      this._computerService.add(this.computer).subscribe(
        () => {
          this.snackBar.open('Done', '', {
            duration: 1000,
          });
          this.dialogRef.close(this.computer);
        },
        error => {
          console.log(error);
          this.snackBar.open('An error occured', '', {
            duration: 1000,
          });
        },
        () => {});
    } else {
      this.name.updateValueAndValidity();
    }
  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' : '';
  }
}
