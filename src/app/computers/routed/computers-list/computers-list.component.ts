import { Component, OnInit, ViewChild } from '@angular/core';
import { ComputersService } from '../../shared/computers.service';
import { Computer } from '../../../shared/models/computer.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ComputersAddComponent } from '../computers-add/computers-add.component';
import { MatSnackBar } from '@angular/material';
import { ProgressBarComponent } from '../../../shared/progress-bar/progress-bar.component';

@Component({
  selector: 'app-computers-list',
  templateUrl: './computers-list.component.html',
  styleUrls: ['./computers-list.component.scss']
})
export class ComputersListComponent implements OnInit {
  computers: MatTableDataSource<Computer>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _computerService: ComputersService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const dialogRef = this.dialog.open(ProgressBarComponent);
    dialogRef.disableClose = true;

    this._computerService.getAllComputer().subscribe(computers => {
      this.computers = new MatTableDataSource(computers);
      this.computers.paginator = this.paginator;
      dialogRef.close();
    },
      error => {
        console.error(error);
        dialogRef.close();
        this.snackBar.open('An error occured', '', {
          duration: 1000,
         });
      },
      () => {});
  }

  applyFilter(filterValue: string) {
    this.computers.filterPredicate =
      (data: Computer, filter: string) => data.name.toLowerCase().startsWith(filter) ||
      (data.company == null ? false : data.company.name.toLowerCase().startsWith(filter));
    this.computers.filter = filterValue.trim().toLowerCase();
    if (this.computers.paginator) {
      this.computers.paginator.firstPage();
    }
  }

  openAddPage() {
    const dialogRef = this.dialog.open(ComputersAddComponent);

    dialogRef.afterClosed().subscribe(result => {this.computers.data.push(result); this.computers._updateChangeSubscription(); });
  }
}
