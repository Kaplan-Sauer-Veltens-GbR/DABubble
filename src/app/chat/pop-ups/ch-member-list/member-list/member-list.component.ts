import { Component } from '@angular/core';
import { AvatarBarComponent } from "../../../../shared/components/chat/avatar-bar/avatar-bar.component";
import { UserAvatarTagComponent } from "../../../../shared/components/user-avatar-tag/user-avatar-tag.component";
import { ReactionPopoverComponent } from "../../../../shared/components/chat/chat-message/reaction-popover/reaction-popover.component";
import { IconLibaryComponent } from "../../../../shared/components/icon-component/icon-libary.component";

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [AvatarBarComponent, UserAvatarTagComponent, ReactionPopoverComponent, IconLibaryComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent {

}
