import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputValidationService {

  constructor() { }

  email: string = '';
  password: string = '';
  name: string = '';
  profilePicture:string = '';
  passedValidation:boolean = false
  onEmailChange(newEmail: string) {
    this.email = newEmail;
  }

  onPasswordChange(newPassword: string) {
    this.password = newPassword;
    
  }

  onNameChange(newName:string) {
    debugger
    const namePattern = /^[A-Za-zÄÖÜäöüß]+([ '-][A-Za-zÄÖÜäöüß]+)*$/;
    if(namePattern.test(newName) && this.name.length >= 3) {
      this.name = newName;
    return true;
    }else {
    
     return false;
    }
  }

  

  onProfileChange(newProfilePicture:string) {
    this.profilePicture = newProfilePicture;
  }


  checkIsFormValid() {
    if(!this.passedValidation) {
      return true;
    }else {
      return false;
    }
  }
}
 