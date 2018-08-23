import { Component, OnInit, ViewChild } from '@angular/core';
import { ComputersService } from '../../shared/computers.service';
import { Computer } from '../../../shared/models/computer.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ComputersAddComponent } from '../computers-add/computers-add.component';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-computers-list',
  templateUrl: './computers-list.component.html',
  styleUrls: ['./computers-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ComputersListComponent implements OnInit {
  computers: MatTableDataSource<Computer>;
  expandedComputer: Computer;
  displayedColumns: string[] = ['Name', 'Introduced', 'Discontinued', 'Manufacturer'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _computerService: ComputersService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._computerService.getAllComputer().subscribe(computers => {
      this.computers = new MatTableDataSource(computers);
      this.computers.paginator = this.paginator;
    },
      error => console.error(error), () => {});
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

  // onDelete(computer: Computer) {
  //  this.computers.splice(this.computers.indexOf(computer), 1);
  // }
}
