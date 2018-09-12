import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ComputersService } from '../../shared/computers.service';
import { CompaniesService } from '../../../companies/shared/companies.service';
import { Computer } from '../../../shared/models/computer.model';
import { FormControl, Validators } from '@angular/forms';
import { Company } from '../../../shared/models/company.model';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ProgressBarComponent } from '../../../shared/progress-bar/progress-bar.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-computers-update',
  templateUrl: './computers-update.component.html',
  styleUrls: ['./computers-update.component.scss']
})
export class ComputersUpdateComponent implements OnInit {
  @Input() computer: Computer;
  @Output() updated: EventEmitter<any> = new EventEmitter();
  companies: Company[];
  name = new FormControl('', [Validators.required]);
  introducedDate: Date;
  discontinuedDate: Date;
  companyId: number;
  today = new Date();

  constructor(
    private _computersService: ComputersService,
    private _companiesService: CompaniesService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private _translate: TranslateService
  ) { }

  ngOnInit() {
    this.today.setDate(this.today.getDate() - 1);
    this._companiesService.getAllCompanies().subscribe(companies => this.companies = companies);

    if (this.computer.introducedDate != null) {
      this.introducedDate = new Date(1970, 0, 1);
      this.introducedDate.setMilliseconds(Date.parse(this.computer.introducedDate));
    }

    if (this.computer.discontinuedDate != null) {
      this.discontinuedDate = new Date(1970, 0, 1);
      this.discontinuedDate.setMilliseconds(Date.parse(this.computer.discontinuedDate));
    }

    if (this.computer.company != null) {
      this.companyId = this.computer.company.id;
    } else {
      this.companyId = -1;
    }
  }

  update() {
    const dialogRef = this.dialog.open(ProgressBarComponent);
    dialogRef.disableClose = true;

    if (!this.name.hasError('required')) {
      if (this.companyId !== -1) {
        this._companiesService.getById(this.companyId.toString()).subscribe(company => this.computer.company = company);
      } else {
        this.computer.company = null;
      }

      if (this.introducedDate != null) {
        this.introducedDate.setDate(this.introducedDate.getDate() + 1);
        this.computer.introducedDate = this.introducedDate.toJSON().substring(0, 10);
      } else {
        this.computer.introducedDate = null;
      }

      if (this.discontinuedDate != null) {
        this.discontinuedDate.setDate(this.discontinuedDate.getDate() + 1);
        this.computer.discontinuedDate = this.discontinuedDate.toJSON().substring(0, 10);
      } else {
        this.computer.discontinuedDate = null;
      }

      this._computersService.update(this.computer).subscribe(
        () => {
          dialogRef.close();
          this.updated.emit();
          this.snackBar.open(this._translate.instant('computer.updated'), '', {
            duration: 1000,
          });
        },
        error => {
          dialogRef.close();
          console.log(error);
          this.snackBar.open(this._translate.instant('error.server'), '', {
            duration: 1000,
          });
        }
      );
    }
  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? this._translate.instant('error.name') : '';
  }
}
