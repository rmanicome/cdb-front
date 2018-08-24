import { Component, OnInit } from '@angular/core';
import { Company } from '../../../shared/models/company.model';
import { FormControl, Validators } from '@angular/forms';
import { CompaniesService } from '../../shared/companies.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-companies-update',
  templateUrl: './companies-update.component.html',
  styleUrls: ['./companies-update.component.scss']
})
export class CompaniesUpdateComponent implements OnInit {
  company: Company;
  name = new FormControl('', [Validators.required]);

  constructor(
    private _companyService: CompaniesService,
    public dialogRef: MatDialogRef<CompaniesUpdateComponent>,
  ) { }

  ngOnInit() {
  }

  sendForm() {

  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' : '';
  }
}
