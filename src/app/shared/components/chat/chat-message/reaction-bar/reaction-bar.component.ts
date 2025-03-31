import {CommonModule} from '@angular/common';
import {Component, EventEmitter, inject, Input, Output, SimpleChanges} from '@angular/core';
import {SingleReactionIconComponent} from './single-reaction-icon/single-reaction-icon.component';
import {IconLibaryComponent} from "../../../icon-component/icon-libary.component";
import {EmojiPickerService} from '../../../../../services/emoji-picker.service';
import {Messages} from '../../../../../interfaces/messages';
import {DbService} from '../../../../../services/db.service';

@Component({
  selector: 'app-reaction-bar',
  standalone: true,
  imports: [CommonModule, SingleReactionIconComponent, IconLibaryComponent],
  templateUrl: './reaction-bar.component.html',
  styleUrl: './reaction-bar.component.scss'
})
export class ReactionBarComponent {
  @Input() isOwner: boolean = false;
  @Input() toggleEmojiPicker:boolean = false;
  @Input() userMessage!:Messages;
  reactionArray!: { [emoji: string]: number }[];
  @Output() isPickerActive:EventEmitter<boolean> = new EventEmitter();
  private dbService = inject(DbService)
  emojiPickerService = inject(EmojiPickerService);


  ngOnInit(): void {
    const reactions = this.userMessage.reactions ?? new Map<string, number>();
    this.reactionArray = this.convertReactionsToArray(reactions)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userMessage'] && this.userMessage) {
      const reactions = this.userMessage.reactions ?? new Map<string, number>();
      this.reactionArray = this.convertReactionsToArray(reactions);
      console.log(this.reactionArray);
    }
  }
  private convertReactionsToArray(reactions: Map<string, number> | { [key: string]: number }) {
    if (reactions instanceof Map) {
      return Array.from(reactions.entries()).map(([emoji, count]) => {
        return { [emoji]: count };
      });
    } else {
      return Object.entries(reactions).map(([emoji, count]) => {
        return { [emoji]: count };
      });
    }
  }
  chooseRecationEmoji() {
    console.log(this.toggleEmojiPicker);
 this.emojiPickerService.openReactionEmojiPicker();
  this.dbService.selectMessage(this.userMessage.messageUID);
  console.log(this.dbService.userMessageID);


  }
  incrementEmoji( reaction: any) {
    console.log(reaction);

    const emojiKeys = Object.keys(reaction);
    console.log(emojiKeys,'wichtig');

    const emoji = emojiKeys[0];
    console.log('Selected emoji:', emoji);
    this.dbService.selectMessage(this.userMessage.messageUID);
    this.emojiPickerService.addReactionEmoji(emoji);
  }
}
