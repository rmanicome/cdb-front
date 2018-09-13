
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatBottomSheet } from '@angular/material';
import { LanguageChoiceComponent } from './language-choice/language-choice.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    public authService: AuthService,
    public router: Router,
    public translate: TranslateService,
    private _bottomSheet: MatBottomSheet
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  logout() {

    this.authService.logout().subscribe(() => {
    if (this.authService.isLoggedIn === false) {
      const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/login';

      // Redirect the user
      this.router.navigate([redirect]);
    }});
  }


  languageChoice() {
    const sheet = this._bottomSheet.open(LanguageChoiceComponent);

    sheet.afterDismissed().subscribe(language => this.switchLanguage(language));
  }
}
