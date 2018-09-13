import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Computer } from '../../../shared/models/computer.model';
import { ComputersService } from '../../shared/computers.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';

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
    public snackBar: MatSnackBar,
    private _translate: TranslateService
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
        this.snackBar.open(this._translate.instant('computer.deleted'), '', { duration: 1000 });
      },
      error => {
        console.log(error);
        this.snackBar.open(this._translate.instant('error.server'), '', {
          duration: 1000,
        });
      }
    );
  }
}
