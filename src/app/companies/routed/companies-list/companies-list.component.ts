import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../shared/companies.service';
import { Company } from '../../../shared/models/company.model';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss']
})
export class CompaniesListComponent implements OnInit {
  companies: Company[];

  constructor(
    private _companiesService: CompaniesService
  ) { }

  ngOnInit() {
    this._companiesService.getAllCompanies().subscribe(companies => this.companies = companies);
  }

}
