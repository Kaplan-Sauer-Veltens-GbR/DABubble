import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';



@Component({
  selector: 'app-user-avatar-tag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-avatar-tag.component.html',
  styleUrl: './user-avatar-tag.component.scss'
})
export class UserAvatarTagComponent {
 
@Input() src:string = './assets/images/avatars/demo_avatar.png'
@Input() isYou:boolean = false;


}
