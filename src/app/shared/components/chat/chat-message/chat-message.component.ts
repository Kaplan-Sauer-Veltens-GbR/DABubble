import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactionPopoverComponent } from "./reaction-popover/reaction-popover.component";
import { ReactionBarComponent } from "./reaction-bar/reaction-bar.component";
import { TranslocoModule } from '@jsverse/transloco';
import { Messages } from '../../../../interfaces/messages';

@Component({
  selector: 'chat-message',
  standalone: true,
  imports: [CommonModule, ReactionPopoverComponent, ReactionBarComponent, TranslocoModule],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss'
})
export class ChatMessageComponent {
  @Input() isOwner: boolean = true;
  @Input() Message!:Messages;
  displayPopover: boolean = false;
  avatarPath: string = '/assets/images/avatars/demo_avatar.png';
  replyAmount: number = 2;


  onHover(state: boolean) {
    this.displayPopover = state;
  }

  
  translateReplyAmount() {
    if (this.replyAmount == 1) {
      return 'chat.subthread.replies.single';
    } else {
      return 'chat.subthread.replies.multiple';
    }
  }
}
