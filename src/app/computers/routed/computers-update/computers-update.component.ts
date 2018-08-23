import { Component, OnInit } from '@angular/core';
import { ComputersService } from '../../shared/computers.service';
import { CompaniesService } from '../../../companies/shared/companies.service';
import { Computer } from '../../../shared/models/computer.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../../../shared/models/company.model';

@Component({
  selector: 'app-computers-update',
  templateUrl: './computers-update.component.html',
  styleUrls: ['./computers-update.component.scss']
})
export class ComputersUpdateComponent implements OnInit {
  computer: Computer;
  companies: Company[];
  name = new FormControl('', [Validators.required]);

  updateForm = this._fb.group({
    id: [''],
    name: [''],
    introduced: [''],
    discontinued: [''],
    company: ['']
  });

  constructor(
    private _route: ActivatedRoute,
    private _computersService: ComputersService,
    private _companiesService: CompaniesService,
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    this._companiesService.getAllCompanies().subscribe(companies => this.companies = companies);
    this._computersService.getById(id).subscribe(computer => {
      this.computer = computer;
      console.log(computer);
      this.updateForm.patchValue({
        id: this.computer.id,
        name: this.computer.name,
        introduced: this.computer.introducedDate,
        discontinued: this.computer.discontinuedDate,
        company: this.computer.company
      });
    });
  }

  sendForm() {
    this.computer.name = this.updateForm.get('name').value;
    this.computer.introducedDate = this.updateForm.get('introduced').value;
    this.computer.discontinuedDate = this.updateForm.get('discontinued').value;
    this.computer.company = this.updateForm.get('company').value;

    this._computersService.update(this.computer).subscribe();
  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' : '';
  }
}
