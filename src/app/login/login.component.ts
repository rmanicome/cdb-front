import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ProgressBarComponent } from '../shared/progress-bar/progress-bar.component';

@Component({
  // selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  message: string;
  username: string;
  password: string;

  constructor(
    public authService: AuthService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private _translate: TranslateService
  ) { }

  login() {
    const dialogRef = this.dialog.open(ProgressBarComponent);
    dialogRef.disableClose = true;

    this.authService.login(this.username, this.password).subscribe(() => {
      dialogRef.close();
      if (this.authService.isLoggedIn) {
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/computers';
        this.snackBar.open(this._translate.instant('welcome') + ' ' + this.username, '', {
          duration: 1000,
        });
        // Redirect the user
        this.router.navigate([redirect]);
      } else {
        this.snackBar.open(this._translate.instant('error.id'), '', {
          duration: 1000,
        });
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
