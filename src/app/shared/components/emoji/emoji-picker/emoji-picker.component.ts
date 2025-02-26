import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { SettingsService } from '../../../../services/settings.service';
import { EmojiPickerService } from '../../../../services/emoji-picker.service';
import { Messages } from '../../../../interfaces/messages';

@Component({
  selector: 'emoji-picker',
  standalone: true,
  imports: [PickerComponent],
  templateUrl: './emoji-picker.component.html',
  styleUrl: './emoji-picker.component.scss',
})
export class EmojiPickerComponent {
  private translations: { [key: string]: any } = {
    de: {
      search: 'Suche',
      emojilist: 'Emoji-Liste',
      notfound: 'Kein Emoji gefunden',
      clear: 'Entfernen',
      categories: {
        search: 'Suchergebnisse',
        recent: 'Häufig genutzt',
        people: 'Smileys & Leute',
        nature: 'Tiere & Natur',
        foods: 'Speisen und Getränke',
        activity: 'Aktivitäten',
        places: 'Reisen und Kultur',
        objects: 'Objekte',
        symbols: 'Symbole',
        flags: 'Flaggen',
        custom: 'Eigene',
      },
    },
  };

  i18n: object = {};
  @Input() isShown:boolean= false;
  @Input() userMessage!:Messages;
  private emojiPickerService = inject(EmojiPickerService)
 @Output() emojiSelected = new EventEmitter<string>()
  settings: SettingsService = inject(SettingsService);

  ngOnInit() {
    this.updateI18n();
    console.log(this.userMessage,'usermessage');
    
  }

  private updateI18n() {
    const lang = this.settings.activeLanguage;
    if (lang === 'de') {
      this.i18n = this.translations[lang];
    }
  }

  handleEmojiSelect(event: any) {
    if (this.shouldAddToMessage(event)) {
      this.emojiPickerService.addEmojiToMessage(event.emoji.native);
    } else {
      this.emojiPickerService.addReactionEmoji(event.emoji.native);
      console.log(event.emoji.native);
      
    }
  }

  shouldAddToMessage(event: any): boolean {
   if(this.emojiPickerService.toggleTextFieldEmojiPicker) {
    return true;
   }else {
    return false; 
   }
    

}}
