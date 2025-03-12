import { Component, EventEmitter, inject, Input,Output } from '@angular/core';
import { ChannelSearchbarComponent } from './channel-searchbar/channel-searchbar.component';
import { AvatarMenuComponent } from './avatar-menu/avatar-menu.component';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ChannelSearchbarComponent, AvatarMenuComponent,NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() isSmallScreen: boolean = false;
  @Input() showChatWindow: boolean = false;

  @Output() closeChatEvent = new EventEmitter<void>();

  closeChat() {
    this.closeChatEvent.emit();
  }
}
