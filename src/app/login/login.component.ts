import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  // selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  message: string;
  email: string;
  password: string;

  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in:' : 'out');
  }

  login() {
    this.message = 'Trying to log in ...';

    this.authService.login(this.email, this.password).subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/computers';

        // Redirect the user
        this.router.navigate([redirect]);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }
}
//   {
//   template: `
//     <h2>LOGIN</h2>
//     <p>{{message}}</p>
//     <p>
//       <button (click)="login()"  *ngIf="!authService.isLoggedIn">Login</button>
//       <button (click)="logout()" *ngIf="authService.isLoggedIn">Logout</button>
//     </p>`
// })
