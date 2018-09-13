import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-choice',
  templateUrl: './language-choice.component.html',
  styleUrls: ['./language-choice.component.scss']
})
export class LanguageChoiceComponent {
  constructor(
    private _currentBottomSheet: MatBottomSheetRef<LanguageChoiceComponent>,
    public translate: TranslateService
  ) { }

  changeLanguage(language: string) {
    this._currentBottomSheet.dismiss(language);
  }

}
