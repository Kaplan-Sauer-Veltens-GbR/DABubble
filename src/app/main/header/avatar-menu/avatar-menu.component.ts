import { Component, inject } from '@angular/core';
import { IconLibaryComponent } from "../../../shared/components/icon-component/icon-libary.component";
import { CommonModule } from '@angular/common';
import { AvatarMenuPopupComponent } from "./avatar-menu-popup/avatar-menu-popup.component";
import { SettingsService } from '../../../services/settings.service';
import { UserAvatarComponent } from "../../../shared/components/user-avatar/user-avatar.component";

@Component({
  selector: 'avatar-menu',
  standalone: true,
  imports: [CommonModule, IconLibaryComponent, AvatarMenuPopupComponent, UserAvatarComponent],
  templateUrl: './avatar-menu.component.html',
  styleUrl: './avatar-menu.component.scss'
})
export class AvatarMenuComponent {
  settings: SettingsService = inject(SettingsService);

  toggleSettings(){
    this.settings.displaySettings = !this.settings.displaySettings;
  }
}
