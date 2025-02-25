import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SingleReactionIconComponent } from './single-reaction-icon/single-reaction-icon.component';
import { IconLibaryComponent } from "../../../icon-component/icon-libary.component";

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
  @Output() isPickerActive:EventEmitter<boolean> = new EventEmitter();
  exampleMsg = {
    reactions: [{'raisingHands': 2}, {'whiteHeavyCheckmark': 3}]
  }
  
  chooseRecationEmoji() {
    console.log(this.toggleEmojiPicker);
  this.toggleEmojiPicker = !this.toggleEmojiPicker;
  this.isPickerActive.emit(this.toggleEmojiPicker);
  }
}

