import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { OnlineStatusService } from '../../../services/online-status.service';
import { WordlistService } from '../../../services/wordlist.service';
import { TranslocoService } from '@jsverse/transloco';
import { capitalize } from '../../../utils/string.utils';

@Component({
  selector: 'user-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss'
})
export class UserAvatarComponent {
  onlineStatus: OnlineStatusService = inject(OnlineStatusService);
  wordlistService: WordlistService = inject(WordlistService);
  translocoService: TranslocoService = inject(TranslocoService);

  @Input() hideUsername: boolean = false;
  @Input() owner: boolean = false;
  @Input() size: number = 50;
  @Input() exampleUser: {name: string, lastActivity: number, isOffline: boolean} = {
    name: 'Frederik Beck',
    lastActivity: Date.now(),
    isOffline: true
  }

  returnUsername():string {
    let suffix = '';
    if (this.owner) {
      suffix = ` (${capitalize(this.translocoService.translate('wordlist.you'))})`;
    } 
    return this.exampleUser.name + suffix;
  }

}
