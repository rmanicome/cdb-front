import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../shared/companies.service';
import { Company } from '../../../shared/models/company.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CompaniesAddComponent } from '../companies-add/companies-add.component';
import { ProgressBarComponent } from '../../../shared/progress-bar/progress-bar.component';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss']
})
export class CompaniesListComponent implements OnInit {
  companies: Company[];
  search: string;

  constructor(
    private _companiesService: CompaniesService,
    private _authService: AuthService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private _translate: TranslateService
  ) { }

  ngOnInit() {
    if ( this._authService.role !== 'ADMIN') {
      this.router.navigate(['/computers']);
    }

    setTimeout(() =>  {
      const dialogRef = this.dialog.open(ProgressBarComponent);
      dialogRef.disableClose = true;

      this._companiesService.getAllCompanies().subscribe(
        companies => {
          this.companies = companies;
          dialogRef.close();
        },
        error => {
          console.error(error);
          dialogRef.close();
          this.snackBar.open(this._translate.instant('error.server'), '', {
            duration: 1000,
          });
        },
        () => {}
      );
    });
  }

  openAddPage() {
    const dialogRef = this.dialog.open(CompaniesAddComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.companies.push(result);
      }
    });
  }

  onDelete(company: Company) {
    this.companies.splice(this.companies.indexOf(company), 1);
  }
}
