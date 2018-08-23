import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Computer } from '../../../shared/models/computer.model';
import { CompaniesService } from '../../../companies/shared/companies.service';
import { Company } from '../../../shared/models/company.model';
import { ComputersService } from '../../shared/computers.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-computer-update',
  templateUrl: './computer-update.component.html',
  styleUrls: ['./computer-update.component.scss']
})
export class ComputerUpdateComponent implements OnInit {
  @Input() computer: Computer;
  companies: Company[];
  name = new FormControl('', [Validators.required]);
  introducedDate: Date;
  discontinuedDate: Date;
  companyId: number;
  today = new Date();

  constructor(
    private _companyService: CompaniesService,
    private _computerService: ComputersService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.today.setDate(this.today.getDate() - 1);
    this._companyService.getAllCompanies().subscribe(companies => {
      this.companies = companies;
      if (this.computer.introducedDate != null) {
        this.introducedDate = new Date(1970, 0, 1);
        this.introducedDate.setMilliseconds(Date.parse(this.computer.introducedDate));
      }
      if (this.computer.discontinuedDate != null) {
        this.discontinuedDate = new Date(1970, 0, 1);
        this.discontinuedDate.setMilliseconds(Date.parse(this.computer.discontinuedDate));
      }
    });
  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' : '';
  }

  update() {
    if (!this.name.hasError('required')) {
      if (this.companyId != null) {
        this._companyService.getById(this.companyId.toString()).subscribe(company => this.computer.company = company);
      } else {
        this.computer.company = null;
      }

      if (this.introducedDate != null) {
        this.introducedDate.setDate(this.introducedDate.getDate() + 1);
        this.computer.introducedDate = this.introducedDate.toJSON().substring(0, 10);
      }

      if (this.discontinuedDate != null) {
        this.discontinuedDate.setDate(this.discontinuedDate.getDate() + 1);
        this.computer.discontinuedDate = this.discontinuedDate.toJSON().substring(0, 10);
      }

      this._computerService.update(this.computer).subscribe(
        () => {
          this.snackBar.open('The computer has been updated', '', {
            duration: 1000,
          });
        },
        error => {
          console.log(error);
          this.snackBar.open('An error occured', '', {
            duration: 1000,
          });
        }
      );
    }
  }

}
