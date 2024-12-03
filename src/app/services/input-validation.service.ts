import { inject, Injectable, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ValidationError } from '../interfaces/validation-error';
import { AuthService } from './auth.service';
import {
  collection,
  Firestore,
  getDocs,
  where,
  query,
} from '@angular/fire/firestore';
import { loggedIn } from '@angular/fire/auth-guard';

@Injectable({
  providedIn: 'root',
})
export class InputValidationService {
  constructor() {}
  email: string = '';
  password: string = '';
  name: string = '';
  notClearedEmail: string = '';
  notClearedPassword: string = '';
  notClearedName: string = '';
  profilePicture: string = '';
   emailIsValid:boolean = false;
  passwordIsValid:boolean = false;
   nameIsValid:boolean = false;
   passedValidation:boolean = false;
  agreedToLegalNotice: boolean = false;
  private authService = inject(AuthService);
  private firestore = inject(Firestore);
  private validationErrorSubject = new BehaviorSubject<ValidationError>({
    email: false,
    password: false,
    name: false,
  });

  validationError$ = this.validationErrorSubject.asObservable();

  setValidationError(field: keyof ValidationError, status: boolean) {
    const currentErrors = this.validationErrorSubject.value;
    currentErrors[field] = status; 
    this.validationErrorSubject.next(currentErrors); 
  }

 async onEmailChange(newEmail: string) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.email = newEmail;
    this.notClearedEmail = newEmail;
    if (emailPattern.test(newEmail) ) {
      this.setValidationError('email', false);
      return true;
    } else {
      return false;
    }
    
  }

  onPasswordChange(newPassword: string) {
    const passwordIncludes =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    this.password = newPassword;
    this.notClearedPassword = newPassword;
    if (passwordIncludes.test(newPassword)) {
      this.setValidationError('password', false);
      return true;
    } else {
      return false;
    }
  }

  onNameChange(newName: string) {
    this.name = newName;
    this.notClearedName = newName;
    const namePattern = /^[A-Za-zÄÖÜäöüß][A-Za-zÄÖÜäöüß '-]*$/;
    if (namePattern.test(newName) && newName.length >= 3) {
      this.setValidationError('name', false);
      return true;
    } else {
      return false;
    }
  }

  onProfileChange(newProfilePicture: string) {
    this.profilePicture = newProfilePicture;
  }

  checkIsFormValid() {
  this.checkInputValidation();
    if (this.passedValidation) {
      return true;
    } else {
      return false;
    }
  }


  checkInputValidation() {
    const validationResults = [
      this.emailIsValid,
      this.passwordIsValid,
      this.nameIsValid,
      this.agreedToLegalNotice
    ];
  const isValid = validationResults.every(result => result === true);
  this.passedValidation = isValid;
  return isValid;
  }


  toggleLegalNotice() {
    this.agreedToLegalNotice = !this.agreedToLegalNotice;
  }


  onInputLeaveName(field: string, value: string) {
    const namePattern = /^[A-Za-zÄÖÜäöüß][A-Za-zÄÖÜäöüß '-]{2,}$/;
    if (!namePattern.test(value)) {
      this.setValidationError(field as keyof ValidationError, true);
      this.nameIsValid = false;
    } else {
      this.setValidationError(field as keyof ValidationError, false);
      this.nameIsValid = true;
      console.log(this.nameIsValid);
      
    }
  }

  onInputLeaveEmail(field: string, value: string) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(value)) {
      this.setValidationError(field as keyof ValidationError, true);
      this.emailIsValid = false;
    } else {
      this.setValidationError(field as keyof ValidationError, false);
      this.emailIsValid = true; // maybe auch beim schreiben direkt hinufügen damit man nicht immer die form verlassen mus für den check
    }
 
  }

  onInputLeavePassword(field: string, value: string) {
    const passwordIncludes =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordIncludes.test(value)) {
      this.setValidationError(field as keyof ValidationError, true);
      this.passwordIsValid = false;
    } else {
      this.setValidationError(field as keyof ValidationError, false);
      this.passwordIsValid = true;
    }
   
  }

  async checkIfEmailExists(email: string) {
    const userCollection = collection(this.firestore, 'users');
    const userQuery = query(userCollection, where('email', '==', email));
     const userQuerySnapshot = await getDocs(userQuery);
     if(userQuerySnapshot.empty) {
      return false;
    }
     return true;
  }

  
  resetValidationResults() {
    this.emailIsValid = false;
    this.passwordIsValid = false;
    this.nameIsValid = false;
    this.agreedToLegalNotice = false;
    this.passedValidation = false;
  }
  
}
