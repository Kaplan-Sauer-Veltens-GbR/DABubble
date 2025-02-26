import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { SingleReactionIconComponent } from './single-reaction-icon/single-reaction-icon.component';
import { IconLibaryComponent } from "../../../icon-component/icon-libary.component";
import { EmojiPickerService } from '../../../../../services/emoji-picker.service';
import { Messages } from '../../../../../interfaces/messages';
import { DbService } from '../../../../../services/db.service';

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
  exampleMsg = {
    reactions: [{'raisingHands': 2}, {'whiteHeavyCheckmark': 3}]
  }

  ngOnInit(): void {
    const reactions = this.userMessage.reactions ?? new Map<string, number>();
    const reactionsArray = this.convertReactionsToArray(reactions);
     this.reactionArray = reactionsArray
    
  }

  private convertReactionsToArray(reactions: Map<string, number> | { [key: string]: number }) {
    // Wenn es eine Map ist, konvertiere sie in ein Array
    if (reactions instanceof Map) {
      return Array.from(reactions.entries()).map(([emoji, count]) => {
        return { [emoji]: count };
      });
    } else {
      // Wenn es ein Objekt ist, bearbeite es direkt
      return Object.entries(reactions).map(([emoji, count]) => {
        return { [emoji]: count };
      });
    }
  }
  chooseRecationEmoji() {
    console.log(this.toggleEmojiPicker);
 this.emojiPickerService.openReactionEmojiPicker();
  this.dbService.selectMessage(this.userMessage.messageUID);

 console.log(this.reactionArray,'usermessage');
  }
}

