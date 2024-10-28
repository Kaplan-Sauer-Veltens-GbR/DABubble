import { Component, inject, Input } from '@angular/core';
import { IconName } from '../../../../../../../interfaces/icon-names.model';
import { IconLibaryComponent } from '../../../../../icon-component/icon-libary.component';
import { TranslocoModule } from '@jsverse/transloco';
import { WordlistService } from '../../../../../../../services/wordlist.service';
import { capitalize } from '../../../../../../../utils/string.utils';

@Component({
  selector: 'app-reaction-details',
  standalone: true,
  imports: [IconLibaryComponent, TranslocoModule],
  templateUrl: './reaction-details.component.html',
  styleUrl: './reaction-details.component.scss'
})
export class ReactionDetailsComponent {

  //CAVE: Make sure in production user[index] is not the index of current user

  wordlist: WordlistService = inject(WordlistService);

  @Input() reaction!: IconName;
  exampleUsers: string[] = ['Kevin', 'Torben', 'Paul'];
  selfReacted: boolean = true;

  firstReaction() {
    return this.exampleUsers.length == 1 && this.selfReacted ?
      capitalize(this.wordlist.translate('you')) :
      this.exampleUsers[0];
  }

  reactionGrammar(onlyOneReaction: boolean) {
    if (onlyOneReaction) {
      return this.selfReacted ? 'reaction-summary.only-one.own' : 'reaction-summary.only-one.other';
    } else {
      return 'reaction-summary.multiple';
    }
  }

  otherReactions() {
    let total = this.exampleUsers.length - 1;
    if (total == 1) {
      return this.selfReacted ?
        ` ${this.wordlist.translate('and', 'you')}` :
        ` ${this.wordlist.translate('and')} ${this.exampleUsers[1]}`;
    } else if (total >= 2) {
      if (this.selfReacted) {
        return total - 1 == 1 ? `, ${this.exampleUsers[1]} ${this.wordlist.translate('and', 'you')}` : `, ${total - 1} ${this.wordlist.translate('others', 'and', 'you')}`;
      } else {
        return ` ${this.wordlist.translate('and')} ${total} ${this.wordlist.translate('others')}`;
      }
    }
    return '';
  }

}