import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>('http://10.0.1.96:8080/cdb/api/v1.0.0/users', {
      name: email,
      password: password
    });
  }
}
