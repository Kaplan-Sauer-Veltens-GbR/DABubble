import { Component, inject } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

import { CommonModule } from '@angular/common';
import { IconLibaryComponent } from '../../../../shared/components/icon-component/icon-libary.component';


@Component({
  selector: 'avatar-menu-popup',
  standalone: true,
  imports: [CommonModule, TranslocoModule, IconLibaryComponent],
  templateUrl: './avatar-menu-popup.component.html',
  styleUrl: './avatar-menu-popup.component.scss'
})
export class AvatarMenuPopupComponent {
  languageFeatureAllowed: boolean = true;

  translocoService: TranslocoService = inject(TranslocoService);

  setLanguageTo(language: 'de' | 'en') {
    this.translocoService.setActiveLang(language);
    localStorage.setItem('language', language);
  }

  isActiveLanguage(language: 'de' | 'en'): boolean {
    return language === this.translocoService.getActiveLang();
  }
}
