import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { User } from '../shared/models/user.model';

@Injectable()
export class AuthService {
  isLoggedIn = false;
  private http: HttpClient;
  public name: String;

  constructor() {

  }

  // store the URL so we can redirect after logging in
  redirectUrl: string;





  login(name: string, password: string): Observable<boolean> {
    this.name = name;
    return of(this.http.post<User>('http://10.0.1.96:8080/cdb/api/v1.0.0/users', {
      name: name,
      password: password
    }) != null).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = true)
    );
  }

  logout(): Observable<boolean> {
    // this.isLoggedIn = false;
    this.name = null;
    return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = false));
    }
}
