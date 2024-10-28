import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../shared/components/inputs/button/button.component';
import { InputFieldsComponent } from '../../shared/components/inputs/input-fields/input-fields.component';
import { IconLibaryComponent } from '../../shared/components/icon-component/icon-libary.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ButtonComponent,
    InputFieldsComponent,
    FormsModule,
    IconLibaryComponent,  // Stelle sicher, dass die Komponente hier eingebunden ist
    CommonModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent { }
