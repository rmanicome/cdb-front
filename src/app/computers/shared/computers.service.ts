import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Computer } from '../../shared/models/computer.model';

@Injectable({
  providedIn: 'root'
})
export class ComputersService {
  private url = 'http://10.0.1.96:8080/cdb/api/v1.0.0/computers';

  constructor(
    private _httpClient: HttpClient
  ) { }

  getAllComputer(): Observable<Computer[]> {
    return this._httpClient.get<Computer[]>(this.url);
  }

  getById(id: string): Observable<Computer> {
    return this._httpClient.get<Computer>(`${this.url}/detail/${id}`);
  }

  add(computer: Computer): Observable<Computer> {
    return this._httpClient.post<Computer>(this.url, computer);
  }

  update(computer: Computer): Observable<Computer> {
    return this._httpClient.put<Computer>(`${this.url}/${computer.id}`, computer);
  }

  delete(computer: Computer): Observable<Computer> {
    return this._httpClient.delete<Computer>(`${this.url}/${computer.id}`);
  }
}
