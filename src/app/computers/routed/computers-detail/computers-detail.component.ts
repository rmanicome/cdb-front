import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Computer } from '../../../shared/models/computer.model';
import { ComputersService } from '../../shared/computers.service';

@Component({
  selector: 'app-computers-detail',
  templateUrl: './computers-detail.component.html',
  styleUrls: ['./computers-detail.component.scss']
})
export class ComputersDetailComponent implements OnInit {
  @Input() computer: Computer;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  expanded = false;

  constructor(
    private _computerService: ComputersService
  ) { }

  ngOnInit() {
  }

  toggle() {
    this.expanded = !this.expanded;
  }

  doDelete() {
    this._computerService.delete(this.computer).subscribe(() => this.delete.emit(this.computer), error => console.log(error), () => {});
  }
}
