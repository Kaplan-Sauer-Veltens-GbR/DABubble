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
} from '@angular/fire/auth';
import { inject } from '@angular/core';

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
  private auth = inject(Auth);
  private provider = new GoogleAuthProvider();

  constructor() {}

  signInWithGoogleRedirect() {
    return signInWithRedirect(this.auth, this.provider);
  }

  signInWithGooglePopup() {
    signInWithPopup(this.auth, this.provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential?.accessToken;
      // console.log(token);

      // The signed-in user info.

      const user = result.user;
      console.log(user, credential);
    });
  }
}
