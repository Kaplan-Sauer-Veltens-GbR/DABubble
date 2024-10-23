import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SingleReactionIconComponent } from './single-reaction-icon/single-reaction-icon.component';

@Component({
  selector: 'app-reaction-bar',
  standalone: true,
  imports: [CommonModule, SingleReactionIconComponent],
  templateUrl: './reaction-bar.component.html',
  styleUrl: './reaction-bar.component.scss'
})
export class ReactionBarComponent {
  @Input() isOwner: boolean = false;

  exampleMsg = {
    reactions: [{'raisingHands': 2}, {'whiteHeavyCheckmark': 3}]
  }
}
