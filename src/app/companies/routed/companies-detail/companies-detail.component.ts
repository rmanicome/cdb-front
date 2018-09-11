import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Company } from '../../../shared/models/company.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ComputersService } from '../../../computers/shared/computers.service';
import { CompaniesUpdateComponent } from '../companies-update/companies-update.component';
import { CompaniesService } from '../../shared/companies.service';
import { Computer } from '../../../shared/models/computer.model';
import { CompaniesComputersTableComponent } from '../companies-computers-table/companies-computers-table.component';

@Component({
  selector: 'app-companies-detail',
  templateUrl: './companies-detail.component.html',
  styleUrls: ['./companies-detail.component.scss']
})
export class CompaniesDetailComponent implements OnInit {
  @Input() company: Company;
  computerList: Computer[];
  @Output() deleted: EventEmitter<any> = new EventEmitter();

  constructor(
    private _companyService: CompaniesService,
    private _computerService: ComputersService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this._computerService.getAllComputer().subscribe(
      computers => {
        this.computerList = computers.filter(computer => computer.company && computer.company.id === this.company.id);
      }
    );
  }

  openUpdate() {
    this.dialog.open(CompaniesUpdateComponent, {
      data: { company: this.company }
    });
  }

  showComputers() {
    this.dialog.open(CompaniesComputersTableComponent, {
      maxHeight: '750px',
      width: '1000px',
      data: { computers: this.computerList }
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
