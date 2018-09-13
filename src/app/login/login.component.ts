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
  username: string;
  password: string;

  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();

  }

  setMessage() {
    this.message =  (this.authService.isLoggedIn ? 'welcome, ' + this.authService.name: ' logged out');
  }

  login() {
    this.message = 'Trying to log in ...';

    this.authService.login(this.username, this.password).subscribe(() => {
      if (this.authService.isLoggedIn) {
        this.setMessage();
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/computers';
        // Redirect the user
        this.router.navigate([redirect]);
      } else {
        this.message = 'error in username or password.';
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }
}
