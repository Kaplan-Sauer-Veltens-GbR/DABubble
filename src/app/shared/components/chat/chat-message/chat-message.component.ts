import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() userMessage!:Messages;
  @Input() userName!: string | null
  @Input() messageSendTime!:string;
  @Input() messageAttachment!: string;
  @Input() toggleEmojiPicker:boolean = false;
  @Output()isPickerActiveChange:EventEmitter<boolean> = new EventEmitter;
  displayPopover: boolean = false;
  avatarPath: string = '/assets/images/avatars/demo_avatar.png';
  replyAmount: number = 2;


  onEmojiPickerChange(newState:boolean) {
    this.isPickerActiveChange.emit(newState);
  }

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
