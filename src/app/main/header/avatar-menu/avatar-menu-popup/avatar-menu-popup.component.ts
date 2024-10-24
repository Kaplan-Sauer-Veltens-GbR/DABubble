import { Component, inject } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

import { CommonModule } from '@angular/common';
import { IconLibaryComponent } from '../../../../shared/components/icon-component/icon-libary.component';
import { SettingsService } from '../../../../services/settings.service';


@Component({
  selector: 'avatar-menu-popup',
  standalone: true,
  imports: [CommonModule, TranslocoModule, IconLibaryComponent],
  templateUrl: './avatar-menu-popup.component.html',
  styleUrl: './avatar-menu-popup.component.scss'
})
export class AvatarMenuPopupComponent {
  settings: SettingsService = inject(SettingsService);
}
