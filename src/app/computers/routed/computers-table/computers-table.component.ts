import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Computer } from '../../../shared/models/computer.model';
import { ComputersService } from '../../shared/computers.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-computers-table',
  templateUrl: './computers-table.component.html',
  styleUrls: ['./computers-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ComputersTableComponent implements OnInit {
  @Input() computers: MatTableDataSource<Computer>;
  displayedColumns: string[] = ['Name', 'Introduced', 'Discontinued', 'Manufacturer'];
  expandedComputer: Computer;

  constructor(
    private _computerService: ComputersService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  close() {
    this.expandedComputer = null;
  }

  doDelete(computer: Computer) {
    this._computerService.delete(computer).subscribe(
      () => {
        this.computers.data.splice(this.computers.data.indexOf(computer), 1);
        this.computers._updateChangeSubscription();
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
