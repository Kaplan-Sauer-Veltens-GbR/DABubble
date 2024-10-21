import { Component, Input } from '@angular/core';
import { ProfileViewComponent } from "./profile-view/profile-view.component";
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { IconLibaryComponent } from '../icon-component/icon-libary.component';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ProfileViewComponent, ProfileEditComponent, IconLibaryComponent, TranslocoModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  @Input() view: 'regular' | 'edit' = 'regular';
  @Input() user = {
    name: 'Paulchen Peterson',
    email: 'simon.schmidt@kafkaesk.de',
    isOnline: true
  }

  openEditView() {
    this.view = 'edit';
  }

  openRegularView() {
    this.view = 'regular';
  }
}