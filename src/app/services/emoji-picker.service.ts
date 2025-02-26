import { inject, Injectable, ViewChild } from '@angular/core';
import { TextMessageFieldComponent } from '../shared/components/inputs/text-message-field/text-message-field.component';
import { Subject } from 'rxjs';
import { DbService } from './db.service';
import { doc, increment, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class EmojiPickerService {
  toggleTextFieldEmojiPicker: boolean = false;
  toggleReactionEmojiPicker: boolean = false;
  private textMessageField!: TextMessageFieldComponent;
  private emojiSelectedSubject = new Subject<string>();
  emojiSelected$ = this.emojiSelectedSubject.asObservable();
  private dbService = inject(DbService);
  constructor() {}

  addEmojiToMessage(emoji: string) {
    this.emojiSelectedSubject.next(emoji);
  }

  async addReactionEmoji(emoji: string) {
    if(!this.dbService.userMessageID) {
      console.warn('errors no message id found');
      return;
    }
    
    const messageRef = doc(
      this.dbService.firestore,
      `privatmessage/${this.dbService.chatID}/messages/${this.dbService.userMessageID}`
    );
    try {
      await updateDoc(messageRef, {
        reactions: {
          [emoji]: increment(1),
        },
      });
  } catch(error) {
console.log(error);

  }
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
