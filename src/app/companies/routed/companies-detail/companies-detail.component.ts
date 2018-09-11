import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Company } from '../../../shared/models/company.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ComputersTableComponent } from '../../../computers/routed/computers-table/computers-table.component';
import { ComputersService } from '../../../computers/shared/computers.service';
import { CompaniesUpdateComponent } from '../companies-update/companies-update.component';
import { CompaniesService } from '../../shared/companies.service';

@Component({
  selector: 'app-companies-detail',
  templateUrl: './companies-detail.component.html',
  styleUrls: ['./companies-detail.component.scss']
})
export class CompaniesDetailComponent implements OnInit {
  @Input() company: Company;
  @Output() deleted: EventEmitter<any> = new EventEmitter();

  constructor(
    private _companyService: CompaniesService,
    private _computerService: ComputersService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  openUpdate() {
    const dialogRef = this.dialog.open(CompaniesUpdateComponent, {
      data: { company: this.company }
    });
  }

  showComputers() {
    this.dialog.open(ComputersTableComponent, {
      data: { }
    });
  }

  doDelete() {
    this._companyService.delete(this.company).subscribe(
      () => {
        this.deleted.emit(this.company);
        this.snackBar.open('The computer has been deleted', '', { duration: 1000 });
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
