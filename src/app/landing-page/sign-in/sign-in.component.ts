import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AuthService } from '../../services/auth.service';

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
  ],
})
export class SignInComponent {
  public auth = inject(AuthService)
}
