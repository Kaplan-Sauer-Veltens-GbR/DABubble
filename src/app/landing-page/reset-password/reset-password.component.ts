import { Component } from '@angular/core';
import { IconLibaryComponent } from "../../shared/components/icon-component/icon-libary.component";
import { ButtonComponent } from "../../shared/components/inputs/button/button.component";
import { InputFieldsComponent } from "../../shared/components/inputs/input-fields/input-fields.component";

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [IconLibaryComponent, ButtonComponent, InputFieldsComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

}
