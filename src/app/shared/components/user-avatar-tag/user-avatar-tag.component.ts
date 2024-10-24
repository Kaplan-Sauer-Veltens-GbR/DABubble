import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { StatusService } from '../../../services/activity-status/status.service';



@Component({
  selector: 'app-user-avatar-tag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-avatar-tag.component.html',
  styleUrl: './user-avatar-tag.component.scss'
})
export class UserAvatarTagComponent {
public Status = inject(StatusService) 
@Input() src:string = './assets/images/avatars/demo_avatar.png'
@Input() isYou:boolean = false;
activityStatus = this.Status.getStatus(this.Status.currentStatus)



}
