import { Component } from '@angular/core';
import { IconLibaryComponent } from "../../../shared/components/icon-component/icon-libary.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'avatar-menu',
  standalone: true,
  imports: [CommonModule, IconLibaryComponent],
  templateUrl: './avatar-menu.component.html',
  styleUrl: './avatar-menu.component.scss'
})
export class AvatarMenuComponent {
  exampleUser: {name: string, onlineStatus: 'online' | 'away' | 'offline'} = {
    name: 'Frederik Beck',
    onlineStatus: 'offline'
  }

}
