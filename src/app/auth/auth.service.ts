import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { User } from '../shared/models/user.model';

@Injectable()
export class AuthService {
  isLoggedIn = false;
  public name: String;
  private url = 'http://10.0.1.96:8080/cdb/api/v1.0.0/users';
  constructor(private http: HttpClient) {

  }

  // store the URL so we can redirect after logging in
  redirectUrl: string;



  getUser(name: string): Observable<User> {
    return this.http.post<User>(this.url, name);
  }


  login(name: string, password: string): Observable<boolean> {
    this.name = name;
    let userExist = false;
      this.getUser(name).subscribe((user) => {
        if (user != null) {
          userExist = true;
        }
      });
      return of(userExist).pipe(
        delay(1000),
        tap(val => this.isLoggedIn = true));
  }

  // login(name: string, password: string): Observable<boolean> {
  //   // this.isLoggedIn = false;
  //   // this.name = null;
  //   return of(true).pipe(
  //     delay(1000),
  //     tap(val => this.isLoggedIn = true),
  //     tap( val => this.name = 'yann')
  //     );
  //   }


  logout(): Observable<boolean> {
    // this.isLoggedIn = false;
    this.name = null;
    return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = false));
    }
}