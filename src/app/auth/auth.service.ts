import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { User } from '../shared/models/user.model';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AuthService {
  isLoggedIn = false;
  public name: String;
  private url = 'http://10.0.1.96:8080/cdb/api/v1.0.0/users';
  role: String;

  constructor(
    private http: HttpClient,
    public snackBar: MatSnackBar,
    private _translate: TranslateService
  ) {

  }

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  getUser(name: string): Observable<User> {
    return this.http.get<User>(`${this.url}/${name}`);
  }


  login(name: string, password: string): Observable<boolean> {
    this.name = name;
    let userExist = false;
      this.getUser(name).subscribe((user) => {
        if (user && user.password === password) {
          userExist = true;
          this.role = user.role;
        }
      });
      return of(userExist).pipe(
        delay(1000),
        tap(val => this.isLoggedIn = userExist));
  }

  logout(): Observable<boolean> {
    this.redirectUrl = null;
    this.name = null;

    return of(true).pipe(
      delay(1000),
      tap(() => {
        this.isLoggedIn = false;
        this.snackBar.open(this._translate.instant('goodbye'), '', {
          duration: 1000,
        });
      }));
    }
}
