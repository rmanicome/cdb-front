import { Component, OnInit, Inject } from '@angular/core';
import { Company } from '../../../shared/models/company.model';
import { FormControl, Validators } from '@angular/forms';
import { CompaniesService } from '../../shared/companies.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { ProgressBarComponent } from '../../../shared/progress-bar/progress-bar.component';

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
    public currentDialog: MatDialogRef<CompaniesUpdateComponent>,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.company = this.data.company;
  }

  update() {
    const dialogRef = this.dialog.open(ProgressBarComponent);
    dialogRef.disableClose = true;

    this._companyService.update(this.company).subscribe(
      () => {
        dialogRef.close();
        this.currentDialog.close();
        this.snackBar.open('The computer has been updated', '', {
          duration: 1000,
        });
      },
      error => {
        dialogRef.close();
        console.log(error);
        this.snackBar.open('An error occured', '', {
          duration: 1000,
        });
      }
    );
  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' : '';
  }
}
