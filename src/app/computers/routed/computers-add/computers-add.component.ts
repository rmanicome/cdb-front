import { Component, OnInit, Inject } from '@angular/core';
import { ComputersService } from '../../shared/computers.service';
import { CompaniesService } from '../../../companies/shared/companies.service';
import { Company } from '../../../shared/models/company.model';
import { Computer } from '../../../shared/models/computer.model';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ProgressBarComponent } from '../../../shared/progress-bar/progress-bar.component';

@Component({
  selector: 'app-computers-add',
  templateUrl: './computers-add.component.html',
  styleUrls: ['./computers-add.component.scss']
})
export class ComputersAddComponent implements OnInit {
  computer = new Computer();
  introducedDate: Date;
  discontinuedDate: Date;
  companyId = -1;
  companies: Company[];
  name = new FormControl('', [Validators.required]);
  today = new Date();

  constructor(
    public dialogRef: MatDialogRef<ComputersAddComponent>,
    private _computerService: ComputersService,
    private _companyService: CompaniesService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.today.setDate(this.today.getDate() - 1);
    this._companyService.getAllCompanies().subscribe(companies => this.companies = companies);
  }

  sendForm() {
    const dialogRef = this.dialog.open(ProgressBarComponent);
    dialogRef.disableClose = true;

    if (!this.name.hasError('required')) {
      if (this.companyId !== -1) {
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

      this._computerService.add(this.computer).subscribe(
        () => {
          dialogRef.close();
          this.snackBar.open('The computer has been added', '', {
            duration: 1000,
          });
          this._computerService.getAllComputer().subscribe(computers => this.computer.id = computers[computers.length - 1].id);
          this.dialogRef.close(this.computer);
        },
        error => {
          dialogRef.close();
          console.log(error);
          this.snackBar.open('An error occured', '', {
            duration: 1000,
          });
        },
        () => {}
      );
    }
  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' : '';
  }
}
