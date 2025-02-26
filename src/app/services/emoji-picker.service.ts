import { Injectable, ViewChild } from '@angular/core';
import { TextMessageFieldComponent } from '../shared/components/inputs/text-message-field/text-message-field.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmojiPickerService {
  toggleTextFieldEmojiPicker: boolean = false;
  toggleReactionEmojiPicker: boolean = false;
  private textMessageField!: TextMessageFieldComponent;
  private emojiSelectedSubject = new Subject<string>();
  emojiSelected$ = this.emojiSelectedSubject.asObservable();

  constructor() {}

  addEmojiToMessage(emoji: string) {
    this.emojiSelectedSubject.next(emoji);
  }

  addReactionEmoji(emoji: string) {
    
  }

  openTextFieldEmojiPicker() {
    if (this.toggleTextFieldEmojiPicker || this.toggleReactionEmojiPicker) {
      this.closeAllPickers();
    }else {
      this.toggleTextFieldEmojiPicker = true;
    }
   
  }

  openReactionEmojiPicker() {
    if (this.toggleTextFieldEmojiPicker || this.toggleReactionEmojiPicker) {
      this.closeAllPickers();
    }else {
      this.toggleReactionEmojiPicker = true;
    }
    
  }

  closeAllPickers() {
    this.toggleTextFieldEmojiPicker = false;
    this.toggleReactionEmojiPicker = false;
  }
}
