import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../shared/components/inputs/button/button.component';
import { InputFieldsComponent } from '../../shared/components/inputs/input-fields/input-fields.component';
import { IconLibaryComponent } from '../../shared/components/icon-component/icon-libary.component';
import { RouterModule } from '@angular/router';
import { InputValidationService } from '../../services/input-validation.service';
import { AuthService } from '../../services/auth.service';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';

@Component({
  selector: 'app-reset-password-email',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputFieldsComponent,
    IconLibaryComponent,
    RouterModule
  ],
  templateUrl: './reset-password-email.component.html',
  styleUrls: ['./reset-password-email.component.scss'],
})
export class ResetPasswordEmailComponent {
  public inputCheck = inject(InputValidationService)
  private auth = inject(Auth);
  async onSubmit() {
  const emailExists = await this.inputCheck.checkIfEmailExists(this.inputCheck.email)
  if(emailExists) {
    this.sendPasswordResetMail();
    return;
  }else {
    console.log('fail');
    
  }
  }

 async sendPasswordResetMail() {
try {
 await sendPasswordResetEmail(this.auth, this.inputCheck.email)
 console.log('send it');
 
}catch(error) {
console.error('error',error);

}
  }
}
