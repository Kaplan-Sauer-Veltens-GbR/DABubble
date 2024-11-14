import { Injectable, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ValidationError } from '../interfaces/validation-error';

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
  agreedToLegalNotice:boolean = false;
  private validationErrorSubject = new BehaviorSubject<ValidationError>({
    field: '',
    status: false
  })

  validationError$ = this.validationErrorSubject.asObservable();


  setValidationError(field:string,status:boolean) {
    this.validationErrorSubject.next({field,status});
  };

  onEmailChange(newEmail: string) {
    debugger
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
    debugger
    const namePattern = /^[A-Za-zÄÖÜäöüß]+([ '-][A-Za-zÄÖÜäöüß]+)*$/;
    if (namePattern.test(newName) && newName.length >= 3) {
      this.name = newName;
      this.setValidationError('name',false);
      return true;
    } else {
      this.setValidationError('name',true);
      return false;
    }
  }

  onProfileChange(newProfilePicture: string) {
    this.profilePicture = newProfilePicture;
  }

  checkIsFormValid() {
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
      this.onNameChange(this.name) &&
      this.agreedToLegalNotice
    ) {
      return (this.passedValidation = true);
    } else {
      return false;
    }
  }

  toggleLegalNotice() {
    this.agreedToLegalNotice = !this.agreedToLegalNotice;
  }
  
}
