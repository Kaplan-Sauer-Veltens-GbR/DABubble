import { Injectable, ViewChild } from '@angular/core';
import { TextMessageFieldComponent } from '../shared/components/inputs/text-message-field/text-message-field.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmojiPickerService {
  toggleEmojiPicker:boolean = false;
  private textMessageField!: TextMessageFieldComponent
  private emojiSelectedSubject = new Subject<string>();
  emojiSelected$ = this.emojiSelectedSubject.asObservable();

  constructor() { }

  

  addEmojiToMessage(emoji: string) {
      this.emojiSelectedSubject.next(emoji);
     
   
  }

  addEmojiToReaction(emoji:string) {
    
  }
}
