import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
  }

  logout() {

    this.authService.logout().subscribe(() => {
    if (this.authService.isLoggedIn === false) {
      const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/login';

      // Redirect the user
      this.router.navigate([redirect]);
    }});
  }

}
