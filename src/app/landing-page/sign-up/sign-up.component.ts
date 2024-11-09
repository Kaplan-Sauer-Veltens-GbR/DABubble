import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../shared/components/inputs/button/button.component';
import { InputFieldsComponent } from '../../shared/components/inputs/input-fields/input-fields.component';
import { IconLibaryComponent } from '../../shared/components/icon-component/icon-libary.component';
import { RouterModule } from '@angular/router';
import { InputValidationService } from '../../services/input-validation.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ButtonComponent,
    InputFieldsComponent,
    FormsModule,
    IconLibaryComponent,  
    CommonModule,
    RouterModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  public inputCheck = inject(InputValidationService)
  private authService = inject(AuthService)
  onSubmit() {
    this.authService.createUserWithEmailAndPassword(this.inputCheck.email,this.inputCheck.password)
  }
 }
