import { Component } from '@angular/core';
import { AvatarBarComponent } from "../../../../shared/components/chat/avatar-bar/avatar-bar.component";
import { ReactionPopoverComponent } from "../../../../shared/components/chat/chat-message/reaction-popover/reaction-popover.component";
import { IconLibaryComponent } from "../../../../shared/components/icon-component/icon-libary.component";
import { UserAvatarComponent } from "../../../../shared/components/user-avatar/user-avatar.component";

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [AvatarBarComponent, ReactionPopoverComponent, IconLibaryComponent, UserAvatarComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent {

}
