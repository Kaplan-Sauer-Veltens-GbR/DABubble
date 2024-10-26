import { Component, Input } from '@angular/core';
import { IconLibaryComponent } from "../../shared/components/icon-component/icon-libary.component";
import { CommonModule } from '@angular/common';
import { AvatarBarComponent } from '../../shared/components/chat/avatar-bar/avatar-bar.component';
import { UserAvatarComponent } from '../../shared/components/user-avatar/user-avatar.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [IconLibaryComponent,CommonModule,UserAvatarComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
@Input() selected:boolean = false;
toggleChannel:boolean [] = [true,true];


toggleList(index:number) {
this.toggleChannel[index] = !this.toggleChannel[index]
}
}

