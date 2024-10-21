import { Component, inject } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { IconLibaryComponent } from "../../icon-component/icon-libary.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [CommonModule, TranslocoModule, IconLibaryComponent],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.scss'
})
export class ProfileMenuComponent {
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
