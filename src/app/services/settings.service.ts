import { inject, Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor() { }

  translocoService: TranslocoService = inject(TranslocoService);
  languageFeatureAllowed: boolean = true;

  displaySettings: boolean = false;

  setLanguageTo(language: 'de' | 'en') {
    this.translocoService.setActiveLang(language);
    localStorage.setItem('language', language);
  }

  isActiveLanguage(language: 'de' | 'en'): boolean {
    return language === this.translocoService.getActiveLang();
  }
}