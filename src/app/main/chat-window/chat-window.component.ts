import { Component, inject } from '@angular/core';
import { IconLibaryComponent } from "../../shared/components/icon-component/icon-libary.component";
import { CommonModule } from '@angular/common';
import { AvatarBarComponent } from "../../shared/components/chat/avatar-bar/avatar-bar.component";
import { ChatMessageComponent } from '../../shared/components/chat/chat-message/chat-message.component';
import { TextMessageFieldComponent } from "../../shared/components/inputs/text-message-field/text-message-field.component";
import { WorkspaceService } from '../../services/workspace.service';
import { ChannelEditPopupComponent } from '../../chat/pop-ups/channel-edit-popup/channel-edit-popup.component';

@Component({
  selector: 'chat-window',
  standalone: true,
  imports: [CommonModule, IconLibaryComponent, AvatarBarComponent, ChatMessageComponent, TextMessageFieldComponent,ChannelEditPopupComponent],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent {
  public workspace = inject(WorkspaceService);
}