import { Component, OnInit } from '@angular/core';
import { Company } from '../../../shared/models/company.model';
import { CompaniesService } from '../../shared/companies.service';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-companies-add',
  templateUrl: './companies-add.component.html',
  styleUrls: ['./companies-add.component.scss']
})
export class CompaniesAddComponent implements OnInit {
  company = new Company();
  name = new FormControl('', [Validators.required]);

  constructor(
    private _companyService: CompaniesService,
    public dialogRef: MatDialogRef<CompaniesAddComponent>,
  ) { }

  ngOnInit() {
  }

  sendForm() {

  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' : '';
  }
}
