import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../shared/components/inputs/button/button.component';
import { InputFieldsComponent } from '../../shared/components/inputs/input-fields/input-fields.component';
import { IconLibaryComponent } from '../../shared/components/icon-component/icon-libary.component';
import { Router, RouterModule } from '@angular/router';
import { InputValidationService } from '../../services/input-validation.service';
import { AuthService } from '../../services/auth.service';
import { ValidationErrorDirective } from '../../directives/validation-error.directive';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ButtonComponent,
    InputFieldsComponent,
    FormsModule,
    IconLibaryComponent,  
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ValidationErrorDirective
    
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  public inputCheck = inject(InputValidationService);
  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
    this.router.navigate(['avatar-picker']);
  }
 }
