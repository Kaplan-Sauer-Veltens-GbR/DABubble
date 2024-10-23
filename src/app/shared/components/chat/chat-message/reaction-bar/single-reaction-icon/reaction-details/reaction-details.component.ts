import { Component, Input } from '@angular/core';
import { IconName } from '../../../../../../../interfaces/icon-names.model';
import { IconLibaryComponent } from '../../../../../icon-component/icon-libary.component';

@Component({
  selector: 'app-reaction-details',
  standalone: true,
  imports: [IconLibaryComponent],
  templateUrl: './reaction-details.component.html',
  styleUrl: './reaction-details.component.scss'
})
export class ReactionDetailsComponent {
  @Input() reaction!: IconName;
  exampleUsers: string[] = ['Torben', 'Michael'];
  selfReacted: boolean = false;

  firstReaction() {
    return this.exampleUsers.length == 1 && this.selfReacted ?
      'Du' :
      this.exampleUsers[0];
  }

  reactionGrammar() {
    return this.selfReacted ? 'hast reagiert' : 'hat reagiert';
  }


  otherReactions() {
    let total = this.exampleUsers.length - 1;
    if (total == 1) {
      return this.selfReacted ?
        'und Du' : `und ${this.exampleUsers[1]}`;
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
