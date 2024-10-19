import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'; // Angular Material Card
import { MatIconModule } from '@angular/material/icon'; // Angular Material Icons
import { MatButtonModule } from '@angular/material/button'; // Angular Material Buttons
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Für Formulare
import { ButtonComponent } from '../../shared/components/inputs/button/button.component';
import { InputFieldsComponent } from '../../shared/components/inputs/input-fields/input-fields.component';
import { IconLibaryComponent } from "../../shared/components/icon-component/icon-libary.component";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputFieldsComponent,
    IconLibaryComponent
]
})
export class SignInComponent {}
