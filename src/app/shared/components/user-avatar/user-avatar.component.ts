import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { OnlineStatusService } from '../../../services/online-status.service';

@Component({
  selector: 'user-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss'
})
export class UserAvatarComponent {
  onlineStatus: OnlineStatusService = inject(OnlineStatusService);

  @Input() hideUsername: boolean = false;
  @Input() size: number = 50;
  @Input() exampleUser: {name: string, lastActivity: number, isOffline: boolean} = {
    name: 'Frederik Beck',
    lastActivity: Date.now(),
    isOffline: true
  }

}
