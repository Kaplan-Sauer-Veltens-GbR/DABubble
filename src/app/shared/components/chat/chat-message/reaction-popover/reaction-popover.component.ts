import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconLibaryComponent } from '../../../icon-component/icon-libary.component';
import { IconName } from '../../../../../interfaces/icon-names.model';

@Component({
  selector: 'app-reaction-popover',
  standalone: true,
  imports: [CommonModule, IconLibaryComponent],
  templateUrl: './reaction-popover.component.html',
  styleUrl: './reaction-popover.component.scss'
})
export class ReactionPopoverComponent {
  @Input() isOwner: boolean = false;
  @Input() isDisplayed: boolean = false;

  public regularIcons: IconName[] = ['whiteHeavyCheckmark', 'raisingHands', 'addReaction', 'comment']
}
