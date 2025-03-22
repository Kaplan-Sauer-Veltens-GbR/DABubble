import { inject, Injectable, ViewChild } from '@angular/core';
import { TextMessageFieldComponent } from '../shared/components/inputs/text-message-field/text-message-field.component';
import { Subject } from 'rxjs';
import { DbService } from './db.service';
import { doc, getDoc, increment, updateDoc } from '@angular/fire/firestore';

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
    if (!this.dbService.userMessageID) {
      console.warn('Error: No message ID found');
      return;
    }
  console.log(emoji,'emoji');
  
    const messageRef = doc(
      this.dbService.firestore,
      `privatmessage/${this.dbService.chatID}/messages/${this.dbService.userMessageID}`
    );
  
    try {
      const messageSnap = await getDoc(messageRef);
      const reactions = messageSnap.data()?.['reactions'] || {};
  
      // if emoji already exist
      if (reactions[emoji]) {
        const userList = reactions[emoji].users || [];
  
        if (userList.includes(this.dbService.userInformation.uid)) {
          // User already reacted
          reactions[emoji].users = userList.filter((id: string) => id !== this.dbService.userInformation.uid);
          reactions[emoji].count = Math.max(0, reactions[emoji].count - 1);
          if (reactions[emoji].count === 0) {
            delete reactions[emoji];
          }
      
        } else {
          // User reacted add  new
          reactions[emoji].users.push(this.dbService.userInformation.uid);
          reactions[emoji].count++;
        }
      } else {
        if(Object.keys(reactions).length >=6) {
          console.warn('too much');
          
          return
        }
        reactions[emoji] = { count: 1, users: [this.dbService.userInformation.uid] };
      }
     
      await updateDoc(messageRef, { reactions });
  
    } catch (error) {
      console.error('Failed to update emoji reaction', error);
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
