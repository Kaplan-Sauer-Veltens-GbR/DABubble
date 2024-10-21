import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconLibaryComponent } from "../../icon-component/icon-libary.component";
import { TranslocoModule } from '@jsverse/transloco';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../inputs/button/button.component";

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [IconLibaryComponent, TranslocoModule, CommonModule, ButtonComponent],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss'
})
export class ProfileViewComponent {
  @Output() editView: EventEmitter<void> = new EventEmitter<void>();

  @Input() user = {
    name: 'Paulchen Peterson',
    isOnline: true
  }

  openEditView(){
    this.editView.emit();
  }
}
