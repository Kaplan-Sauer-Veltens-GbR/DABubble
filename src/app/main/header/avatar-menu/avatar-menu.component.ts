import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { IconLibaryComponent } from '../../../shared/components/icon-component/icon-libary.component';
import { CommonModule } from '@angular/common';
import { AvatarMenuPopupComponent } from './avatar-menu-popup/avatar-menu-popup.component';
import { SettingsService } from '../../../services/settings.service';
import { UserAvatarComponent } from '../../../shared/components/user-avatar/user-avatar.component';
import { WorkspaceService } from '../../../services/workspace.service';
import { DbService } from '../../../services/db.service';

@Component({
  selector: 'avatar-menu',
  standalone: true,
  imports: [
    CommonModule,
    IconLibaryComponent,
    AvatarMenuPopupComponent,
    UserAvatarComponent,
  ],
  templateUrl: './avatar-menu.component.html',
  styleUrl: './avatar-menu.component.scss',
})
export class AvatarMenuComponent {
  settings: SettingsService = inject(SettingsService);
  public workspace = inject(WorkspaceService);
  private elementRef = inject(ElementRef);
  public dbService = inject (DbService);

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (this.workspace.isClickOutside(event, this.elementRef.nativeElement)) {
      this.settings.displaySettings = false;
    }
  }

  toggleSettings() {
    this.settings.displaySettings = !this.settings.displaySettings;
  }
}
