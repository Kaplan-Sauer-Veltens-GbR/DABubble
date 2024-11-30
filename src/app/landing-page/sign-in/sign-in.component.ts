import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonComponent } from '../../shared/components/inputs/button/button.component';
import { InputFieldsComponent } from '../../shared/components/inputs/input-fields/input-fields.component';
import { IconLibaryComponent } from '../../shared/components/icon-component/icon-libary.component';
import {
  Auth,
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from '@angular/fire/auth';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslocoModule } from '@jsverse/transloco';
import { AuthService } from '../../services/auth.service';
import { DbService } from '../../services/db.service';
import { InputValidationService } from '../../services/input-validation.service';
import { ValidationErrorDirective } from '../../directives/validation-error.directive';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputFieldsComponent,
    IconLibaryComponent,
    TranslocoModule,
    ValidationErrorDirective
    
  ],
})
export class SignInComponent {
  public auth = inject(AuthService);
  public dataBase = inject(DbService);
  public inputCheck = inject(InputValidationService)
 
  ngOnInit(): void {}

    async onSubmit() {
    this.inputCheck.checkIfEmailExists(this.inputCheck.email)
   const result =  await this.auth.signIn(this.inputCheck.email, this.inputCheck.password);
   debugger
   if(result === false) {
    this.inputCheck.setValidationError('password',true)
   }
  }
} 
