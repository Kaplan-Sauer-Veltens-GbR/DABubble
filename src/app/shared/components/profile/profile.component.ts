import { Component, Input } from '@angular/core';
import { ProfileViewComponent } from "./profile-view/profile-view.component";
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProfileViewComponent, ProfileEditComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  @Input() view: 'regular' | 'edit' = 'regular';
  @Input() user = {
    name: 'Paulchen Peterson',
    isOnline: true
  }
}
