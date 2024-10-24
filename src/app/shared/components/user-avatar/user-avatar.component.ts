import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'user-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss'
})
export class UserAvatarComponent {
  @Input() hideUsername: boolean = false;
  @Input() size: number = 50;
  @Input() exampleUser: {name: string, onlineStatus: 'online' | 'away' | 'offline'} = {
    name: 'Frederik Beck',
    onlineStatus: 'offline'
  }

}
