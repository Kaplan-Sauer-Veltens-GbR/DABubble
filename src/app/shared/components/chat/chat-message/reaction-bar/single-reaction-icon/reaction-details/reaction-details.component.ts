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
  exampleUsers: string[] = ['Kevin', 'Sophie', 'You'];
  selfReacted: boolean = false;

  firstReaction() {

  }

  /**
   * 
   * @returns string
   */
  otherReactions() {
    let total = this.exampleUsers.length - 1;
    if (total == 1) {
      if (this.selfReacted) {
        return 'und Du';
      } else {
        return `und ${this.exampleUsers[1]}`;
      }
    } else if (total >= 2) {
      if (this.selfReacted) {
        if (total - 1 == 1) {return `ein weiterer und Du` } else {
          return `, ${total - 1} weitere und Du`;
        }
      } else {
        return `und ${total} weitere`;
      }
    }
    return '';
  }
}
