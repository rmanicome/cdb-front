import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../../shared/models/company.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  private url = 'http://127.0.0.1:8080/cdb/api/v1.0.0/companies';

  constructor(
    private _httpClient: HttpClient
  ) { }

  getAllCompanies(): Observable<Company[]> {
    return this._httpClient.get<Company[]>(this.url);
  }

  getById(id: string): Observable<Company> {
    return this._httpClient.get<Company>(`${this.url}/detail/${id}`);
  }
}
