import { Component, inject } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { IconLibaryComponent } from "../../icon-component/icon-libary.component";

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [TranslocoModule, IconLibaryComponent],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.scss'
})
export class ProfileMenuComponent {
  languageFeatureAllowed: boolean = true;

  translocoService: TranslocoService = inject(TranslocoService);

  setLanguageTo(newLanguage: 'de' | 'en') {
    this.translocoService.setActiveLang(newLanguage);
    localStorage.setItem('language', newLanguage);
  }
}
