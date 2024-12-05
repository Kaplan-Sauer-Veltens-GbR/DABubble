import { Component, inject } from '@angular/core';
import { IconLibaryComponent } from "../../shared/components/icon-component/icon-libary.component";
import { ButtonComponent } from "../../shared/components/inputs/button/button.component";
import { InputFieldsComponent } from "../../shared/components/inputs/input-fields/input-fields.component";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Auth, confirmPasswordReset } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';
import { InputValidationService } from '../../services/input-validation.service';
import { ValidationErrorDirective } from '../../directives/validation-error.directive';
import { PopupNotificationComponent } from '../../shared/components/popup-notification/popup-notification.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [IconLibaryComponent, ButtonComponent, InputFieldsComponent,RouterLink,ValidationErrorDirective,PopupNotificationComponent,CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

private auth = inject(Auth)
private route = inject(ActivatedRoute)
private router = inject(Router)
public inputCheck = inject(InputValidationService)
showPopup: boolean = true; 
  popupMessage: string = ''; 


submitNewPassword() {
  const oobCode = this.route.snapshot.queryParamMap.get('oobCode');
  const isFormValid = 
  oobCode &&
  this.inputCheck.checkPasswordStrength(this.inputCheck.password) &&
  this.inputCheck.onConfirmPasswordChange(this.inputCheck.confirmedPassword)
  if(isFormValid) {
    this.showPopUp();
    this.resetPassword(oobCode,this.inputCheck.password );
    setTimeout(() => {
      this.routeBack();
    }, 1500);
  }else {
   this.handleValidationErrors();
  }if(!oobCode) {
    console.log('placeholder your are not a valid user request');
    
  }
  }

  routeBack() {
    this.router.navigate([''])
  }


  async resetPassword(oobCode: string, newPassword:string) {
    try {
      await confirmPasswordReset(this.auth,oobCode,newPassword);
    }catch(error) {
      console.error('change of password went wrong' ,error);
    }
  }

  handleValidationErrors() {
    if (!this.inputCheck.checkPasswordStrength(this.inputCheck.password)) {
      this.inputCheck.setValidationError('password', true);
    }
  
    if (!this.inputCheck.onConfirmPasswordChange(this.inputCheck.confirmedPassword)) {
      this.inputCheck.setValidationError('confirmPassword', true);
    }
  }
  showPopUp() {
    this.showPopup = true; 
    this.popupMessage = 'E-Mail wurde erfolgreich gesendet!';
    
  }
}

