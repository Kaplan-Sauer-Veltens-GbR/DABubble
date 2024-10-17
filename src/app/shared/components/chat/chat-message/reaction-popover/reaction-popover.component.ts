import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reaction-popover',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reaction-popover.component.html',
  styleUrl: './reaction-popover.component.scss'
})
export class ReactionPopoverComponent {
@Input() isOwner: boolean = false;
@Input() isDisplayed: boolean = false;
}
