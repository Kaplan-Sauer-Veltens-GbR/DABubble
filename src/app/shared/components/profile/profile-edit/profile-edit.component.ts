import { Component, Input } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { IconLibaryComponent } from '../../icon-component/icon-libary.component';
import { InputFieldsComponent } from "../../inputs/input-fields/input-fields.component";
import { ButtonComponent } from "../../inputs/button/button.component";

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [TranslocoModule, IconLibaryComponent, InputFieldsComponent, ButtonComponent],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss'
})
export class ProfileEditComponent {
  @Input() user = {
    name: 'Paulchen Peterson',
    isOnline: true
  }
}
