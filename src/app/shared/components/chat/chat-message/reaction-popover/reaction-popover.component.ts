import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { IconLibaryComponent } from '../../../icon-component/icon-libary.component';
import { IconName } from '../../../../../interfaces/icon-names.model';
import { Messages } from '../../../../../interfaces/messages';
import { DbService } from '../../../../../services/db.service';

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
  @Input() userMessage!: Messages;
  public dbService = inject(DbService)
  editMode:boolean = false;

  public regularIcons: IconName[] = ['whiteHeavyCheckmark', 'raisingHands', 'addReaction', 'comment']


openEditField() {
this.editMode = !this.editMode;
}
editing() {
  console.log(this.userMessage);
  
}
}

