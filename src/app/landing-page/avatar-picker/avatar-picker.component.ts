import { Component } from '@angular/core';
import { IconLibaryComponent } from '../../shared/components/icon-component/icon-libary.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../shared/components/inputs/button/button.component';
import { InputFieldsComponent } from '../../shared/components/inputs/input-fields/input-fields.component';

@Component({
  selector: 'app-avatar-picker',
  standalone: true,
  imports: [IconLibaryComponent,CommonModule,ButtonComponent],
  templateUrl: './avatar-picker.component.html',
  styleUrl: './avatar-picker.component.scss'
})
export class AvatarPickerComponent {

}
