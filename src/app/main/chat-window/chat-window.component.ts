import { Component } from '@angular/core';
import { IconLibaryComponent } from "../../shared/components/icon-component/icon-libary.component";
import { CommonModule } from '@angular/common';
import { AvatarBarComponent } from "../../shared/components/chat/avatar-bar/avatar-bar.component";

@Component({
  selector: 'chat-window',
  standalone: true,
  imports: [CommonModule, IconLibaryComponent, AvatarBarComponent],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent {

}
