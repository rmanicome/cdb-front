import { Component, OnInit } from '@angular/core';
import { ComputersService } from '../../shared/computers.service';
import { Computer } from '../../../shared/models/computer.model';

@Component({
  selector: 'app-computers-list',
  templateUrl: './computers-list.component.html',
  styleUrls: ['./computers-list.component.scss']
})
export class ComputersListComponent implements OnInit {
  computers: Computer[];

  constructor(
    private _computerService: ComputersService
  ) { }

  ngOnInit(): void {
    this._computerService.getAllComputer().subscribe(computers => this.computers = computers, error => console.error(error), () => {});
  }

  onDelete(computer: Computer) {
    this.computers.splice(this.computers.indexOf(computer), 1);
  }
}
