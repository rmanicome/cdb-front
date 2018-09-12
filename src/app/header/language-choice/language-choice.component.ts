import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-language-choice',
  templateUrl: './language-choice.component.html',
  styleUrls: ['./language-choice.component.scss']
})
export class LanguageChoiceComponent {
  constructor(
    private _currentBottomSheet: MatBottomSheetRef<LanguageChoiceComponent>
  ) { }

  changeLanguage(language: string) {
    this._currentBottomSheet.dismiss(language);
  }

}
