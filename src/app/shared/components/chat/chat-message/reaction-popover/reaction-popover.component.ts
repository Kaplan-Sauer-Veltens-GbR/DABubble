import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject, Input, ViewChild, viewChild } from '@angular/core';
import { IconLibaryComponent } from '../../../icon-component/icon-libary.component';
import { IconName } from '../../../../../interfaces/icon-names.model';
import { Messages } from '../../../../../interfaces/messages';
import { DbService } from '../../../../../services/db.service';
import { WorkspaceService } from '../../../../../services/workspace.service';

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
   @ViewChild('editField', { static: false }) editField!: ElementRef;
  public dbService = inject(DbService)
  private workspace = inject(WorkspaceService)
  
  editMode:boolean = false;

  public regularIcons: IconName[] = ['whiteHeavyCheckmark', 'raisingHands', 'addReaction', 'comment']


openEditField() {
this.editMode = !this.editMode;
}
editing() {
  console.log(this.userMessage);
  
}

 @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (this.editField?.nativeElement && this.workspace.isClickOutside(event, this.editField.nativeElement) ) {
      this.editMode = false;
    }
  }
}

