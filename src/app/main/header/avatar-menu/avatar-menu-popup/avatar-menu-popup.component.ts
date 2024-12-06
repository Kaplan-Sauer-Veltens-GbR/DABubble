import { Component, ElementRef, inject } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

import { CommonModule } from '@angular/common';
import { IconLibaryComponent } from '../../../../shared/components/icon-component/icon-libary.component';
import { SettingsService } from '../../../../services/settings.service';
import { AuthService } from '../../../../services/auth.service';
import { WorkspaceFabComponent } from '../../../sidebar/workspace-fab/workspace-fab.component';
import { WorkspaceService } from '../../../../services/workspace.service';


@Component({
  selector: 'avatar-menu-popup',
  standalone: true,
  imports: [CommonModule, TranslocoModule, IconLibaryComponent],
  templateUrl: './avatar-menu-popup.component.html',
  styleUrl: './avatar-menu-popup.component.scss'
})
export class AvatarMenuPopupComponent {
  public authService = inject(AuthService);
  private workspace = inject(WorkspaceService);
  private elementRef = inject(ElementRef);
  settings: SettingsService = inject(SettingsService);
}
