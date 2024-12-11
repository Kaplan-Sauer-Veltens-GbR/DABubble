import { Component, inject, Input } from '@angular/core';
import {
  EmojiComponent,
  EmojiData,
  EmojiService,
} from '@ctrl/ngx-emoji-mart/ngx-emoji';

@Component({
  selector: 'emoji',
  standalone: true,
  imports: [EmojiComponent],
  templateUrl: './emoji.component.html',
  styleUrl: './emoji.component.scss',
})
export class CustomEmojiComponent {
  @Input() name: string = '';
  @Input() skintone: 1 | 2 | 3 | 4 | 5 | 6 | undefined;
  @Input() set: '' | 'apple' | 'google' | 'twitter' | 'facebook' | undefined =
    '';
  @Input() size: number = 32;

  private emojiService = inject(EmojiService);

  get emoji() {
    let emoji = this.emojiService.getData(this.name, this.skintone, this.set);
    return emoji ? emoji : '';
  }
}
