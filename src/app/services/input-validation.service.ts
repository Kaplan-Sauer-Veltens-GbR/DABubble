import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputValidationService {

  constructor() { }

  email: string = '';
  password: string = '';

  onEmailChange(newEmail: string) {
    this.email = newEmail;
  }

  onPasswordChange(newPassword: string) {
    this.password = newPassword;
  }

}
