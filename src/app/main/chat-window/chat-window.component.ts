import { Component } from '@angular/core';
import { IconLibaryComponent } from "../../shared/components/icon-component/icon-libary.component";
import { CommonModule } from '@angular/common';
import { AvatarBarComponent } from "../../shared/components/chat/avatar-bar/avatar-bar.component";
import { ChatMessageComponent } from '../../shared/components/chat/chat-message/chat-message.component';
import { TextMessageFieldComponent } from "../../shared/components/inputs/text-message-field/text-message-field.component";

@Component({
  selector: 'chat-window',
  standalone: true,
  imports: [CommonModule, IconLibaryComponent, AvatarBarComponent, ChatMessageComponent, TextMessageFieldComponent],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent {

}
