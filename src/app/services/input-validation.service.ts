import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InputValidationService {
  constructor() {}

  email: string = '';
  password: string = '';
  name: string = '';
  profilePicture: string = '';
  passedValidation: boolean = false;
  onEmailChange(newEmail: string) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailPattern.test(newEmail)) {
      this.email = newEmail;
      return true;
    } else {
      return false;
    }
  }

  onPasswordChange(newPassword: string) {
    const passwordIncludes =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (passwordIncludes.test(newPassword)) {
      this.password = newPassword;
      return true;
    } else {
      return false;
    }
  }

  onNameChange(newName: string) {
    const namePattern = /^[A-Za-zÄÖÜäöüß]+([ '-][A-Za-zÄÖÜäöüß]+)*$/;
    if (namePattern.test(newName) && newName.length >= 3) {
      this.name = newName;
      return true;
    } else {
      return false;
    }
  }

  onProfileChange(newProfilePicture: string) {
    this.profilePicture = newProfilePicture;
  }

  checkIsFormValid() {
    debugger
    if (!this.checkInputValidation()) {
      return true;
    } else {
      return false;
    }
  }

  checkInputValidation() {  
    if (
      this.onPasswordChange(this.password) &&
      this.onEmailChange(this.email) &&
      this.onNameChange(this.name)
    ) {
      return (this.passedValidation = true);
    } else {
      return false;
    }
  }
}
