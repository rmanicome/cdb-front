import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../shared/models/user.model';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user = new User();
  name = new FormControl('', [Validators.required]);

  constructor(
    private authService: AuthService,
    public currentDialog: MatDialogRef<RegisterComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
    private _translate: TranslateService
  ) { }

  ngOnInit() {
  }

  sendForm() {

    this.authService.add(this.user).subscribe(
      () => {
        this.currentDialog.close();
        this.authService.role = 'USER';
        this.authService.isLoggedIn = true;
        this.router.navigate(['/computers']);
        this.snackBar.open(this._translate.instant('register complete'), '', {
          duration: 1000,
        });
      },
      error => {
        console.log(error);
        this.snackBar.open(this._translate.instant('error.server'), '', {
          duration: 1000,
        });
      }
    );
  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? this._translate.instant('error.name') : '';
  }
}



