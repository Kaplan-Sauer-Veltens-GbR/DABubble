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
    this.name = newName;
  }

  
  onProfileChange(newProfilePicture:string) {
    this.profilePicture = newProfilePicture;
  }


  checkIfNameisValid() {

  }
}
 