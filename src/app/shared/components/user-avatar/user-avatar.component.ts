import {CommonModule, NgOptimizedImage} from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { OnlineStatusService } from '../../../services/online-status.service';
import { WordlistService } from '../../../services/wordlist.service';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { capitalize } from '../../../utils/string.utils';
import { DbService } from '../../../services/db.service';
import { UserData } from '../../../interfaces/user-model';

@Component({
  selector: 'user-avatar',
  standalone: true,
  imports: [CommonModule, TranslocoModule, NgOptimizedImage],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss',
})
export class UserAvatarComponent {
  onlineStatus: OnlineStatusService = inject(OnlineStatusService);
  wordlistService: WordlistService = inject(WordlistService);
  translocoService: TranslocoService = inject(TranslocoService);
  public dbService = inject(DbService);
  @Input() hideUsername: boolean = false;
  @Input() strikeUsername: boolean = false;
  @Input() hideOnlineStatus: boolean = false;
  @Input() owner: boolean = false;
  @Input() size: number = 50;
  @Input() userId: string = '';
  @Input() photoURL!: string;
  @Input() user: UserData = {
    uid: '',
    displayName: 'Frederik Beck',
    email: '',
    photoURL: '',
    lastLogin: new Date(),
    lastActivity: new Date(),
    isOnline: true,
  };
  @Input() userListHover: boolean = false;

  returnUsername(): string {
    let suffix = '';
    if (this.owner) {
      suffix = ` (${capitalize(
        this.translocoService.translate('wordlist.you')
      )})`;
    }
    return this.user.displayName + suffix;
  }

  returnAriaLabel(): string | null {
    if (!this.hideOnlineStatus) {
      return (
        this.user.displayName +
        ': ' +
        this.onlineStatus.getStatus(this.user.lastActivity, this.user.isOnline)
      );
    } else {
      return this.user.displayName;
    }
  }

  get isOnline() {
    return (
      'is-' +
      this.onlineStatus.getStatus(this.user.lastActivity, this.user.isOnline)
    );
  }
}
