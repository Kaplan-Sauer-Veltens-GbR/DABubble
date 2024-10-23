import { Component, inject, Input } from '@angular/core';
import { IconName } from '../../../../../../../interfaces/icon-names.model';
import { IconLibaryComponent } from '../../../../../icon-component/icon-libary.component';
import { TranslocoModule } from '@jsverse/transloco';
import { WordlistService } from '../../../../../../../services/wordlist.service';

@Component({
  selector: 'app-reaction-details',
  standalone: true,
  imports: [IconLibaryComponent, TranslocoModule],
  templateUrl: './reaction-details.component.html',
  styleUrl: './reaction-details.component.scss'
})
export class ReactionDetailsComponent {
  wordlist: WordlistService = inject(WordlistService);

  @Input() reaction!: IconName;
  exampleUsers: string[] = ['Kevin', 'Torben'];
  selfReacted: boolean = true;

  firstReaction() {
    return this.exampleUsers.length == 1 && this.selfReacted ?
      this.wordlist.translate('you') :
      this.exampleUsers[0];
  }

  reactionGrammar(onlyOneReaction: boolean) {
    if (onlyOneReaction) {
      return this.selfReacted ? 'reaction-summary.only-one.own' : 'reaction-summary.only-one.other';
    } else {
      return 'reaction-summary.multiple' //reacted : have reacted
    }
  }

  getGrammarArgument() {
    if (!this.selfReacted && this.exampleUsers.length == 2) {
      return { 'argument': 'have ' };
    } else {
      return { 'argument': '' };
    }
  }


  otherReactions() {
    let total = this.exampleUsers.length - 1;
    if (total == 1) {
      return this.selfReacted ?
        this.wordlist.translate('and', 'you') :
        `${this.wordlist.translate('and')} ${this.exampleUsers[1]}`;
    } else if (total >= 2) {
      if (this.selfReacted) {
        return total - 1 == 1 ? `ein anderer und Du` : `, ${total - 1} andere und Du`;
      } else {
        return `und ${total} andere`;
      }
    }
    return '';
  }
}
