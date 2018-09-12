import { Component } from '@angular/core';
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
    public translate: TranslateService,
    private _bottomSheet: MatBottomSheet
  ) {
    translate.setDefaultLang('en');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  languageChoice() {
    const sheet = this._bottomSheet.open(LanguageChoiceComponent);

    sheet.afterDismissed().subscribe(language => this.switchLanguage(language));
  }
}
