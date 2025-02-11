import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { SettingsService } from '../../../../services/settings.service';

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


 @Output() emojiSelected = new EventEmitter<string>()
  settings: SettingsService = inject(SettingsService);

  ngOnInit() {
    this.updateI18n();
  }

  private updateI18n() {
    const lang = this.settings.activeLanguage;
    if (lang === 'de') {
      this.i18n = this.translations[lang];
    }
  }

  addEmoji(event: any) {
    this.emojiSelected.emit(event.emoji.native); // Emoji wird an Parent gesendet
   
  }
}
