import { Component, inject } from '@angular/core';
import { IconLibaryComponent } from "../../shared/components/icon-component/icon-libary.component";
import { ButtonComponent } from "../../shared/components/inputs/button/button.component";
import { InputFieldsComponent } from "../../shared/components/inputs/input-fields/input-fields.component";
import { RouterLink } from '@angular/router';
import { Auth, confirmPasswordReset } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [IconLibaryComponent, ButtonComponent, InputFieldsComponent,RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

private auth = inject(Auth)

ngOnInit(): void {
  
  
}

  async resetPassword(oobCode: string, newPassword:string) {
    try {
      await confirmPasswordReset(this.auth,oobCode,newPassword);
    }catch(error) {
      console.error('change of password went wrong' ,error);
      
    }
  }
}
