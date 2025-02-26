import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { SingleReactionIconComponent } from './single-reaction-icon/single-reaction-icon.component';
import { IconLibaryComponent } from "../../../icon-component/icon-libary.component";
import { EmojiPickerService } from '../../../../../services/emoji-picker.service';
import { Messages } from '../../../../../interfaces/messages';

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
  @Output() isPickerActive:EventEmitter<boolean> = new EventEmitter();
  emojiPickerService = inject(EmojiPickerService);
  exampleMsg = {
    reactions: [{'raisingHands': 2}, {'whiteHeavyCheckmark': 3}]
  }
  
  chooseRecationEmoji() {
    console.log(this.toggleEmojiPicker);
 this.emojiPickerService.openReactionEmojiPicker();
 console.log(this.userMessage,'usermessage');
 
  
  // this.isPickerActive.emit(this.toggleEmojiPicker);
  }
}

