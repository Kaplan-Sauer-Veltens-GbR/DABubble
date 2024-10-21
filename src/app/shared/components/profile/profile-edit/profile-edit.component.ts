import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() regularView: EventEmitter<void> = new EventEmitter<void>();

  @Input() user = {
    name: 'Paulchen Peterson',
    email: '',
    isOnline: true
  }

  openRegularView() {
    this.regularView.emit();
  }

  saveChanges() {
    //TODO
    this.openRegularView();
  }
}
