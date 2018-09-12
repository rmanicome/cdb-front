import { Component, OnInit } from '@angular/core';
import { Company } from '../../../shared/models/company.model';
import { CompaniesService } from '../../shared/companies.service';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { ProgressBarComponent } from '../../../shared/progress-bar/progress-bar.component';
import { TranslateService } from '@ngx-translate/core';

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
    public currentDialog: MatDialogRef<CompaniesAddComponent>,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private _translate: TranslateService
  ) { }

  ngOnInit() {
  }

  sendForm() {
    const dialogRef = this.dialog.open(ProgressBarComponent);
    dialogRef.disableClose = true;

    this._companyService.add(this.company).subscribe(
      () => {
        dialogRef.close();
        this.snackBar.open(this._translate.instant('company.added'), '', {
          duration: 1000,
        });
        this._companyService.getAllCompanies().subscribe(companies => this.company.id = companies[companies.length - 1].id);
        this.currentDialog.close(this.company);
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

  getNameErrorMessage() {
    return this.name.hasError('required') ? this._translate.instant('errro.name') : '';
  }
}
