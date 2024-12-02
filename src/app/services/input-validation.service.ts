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
  passedValidation: boolean = false;
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

  onEmailChange(newEmail: string) {

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.email = newEmail;
    this.notClearedEmail = newEmail;
    if (emailPattern.test(newEmail)) {
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
    if (!this.checkInputValidation()) {
      return true;
    } else {
      return false;
    }
  }

  checkInputValidation() {

    const validationResults = [
      this.onPasswordChange(this.notClearedPassword),
      this.onEmailChange(this.notClearedEmail),
      this.onNameChange(this.notClearedName),
      this.agreedToLegalNotice
  ];

  // Alle Felder müssen gültig sein, damit die Gesamtvalidierung true zurückgibt
  const isValid = validationResults.every(result => result === true);

  // Wenn alle Bedingungen erfüllt sind, gibt es true zurück
  this.passedValidation = isValid;
  return isValid;
  }

  toggleLegalNotice() {
    this.agreedToLegalNotice = !this.agreedToLegalNotice;
  }

  onInputLeaveName(field: string, value: string) {
    console.log(value);
    
    const namePattern = /^[A-Za-zÄÖÜäöüß][A-Za-zÄÖÜäöüß '-]{2,}$/;
    if (!namePattern.test(value)) {
      this.setValidationError(field as keyof ValidationError, true);
    } else {
      this.setValidationError(field as keyof ValidationError, false);
    }
  }

  onInputLeaveEmail(field: string, value: string) {
    debugger
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(value)) {
      this.setValidationError(field as keyof ValidationError, true);
      
    } else {
      this.setValidationError(field as keyof ValidationError, false);
      
    }
    
  }

  onInputLeavePassword(field: string, value: string) {
    const passwordIncludes =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordIncludes.test(value)) {
      this.setValidationError(field as keyof ValidationError, true);
    } else {
      this.setValidationError(field as keyof ValidationError, false);
    }
  }

  async checkIfEmailExists(email: string) {
    const userCollection = collection(this.firestore, 'users');
    const userQuery = query(userCollection, where('email', '==', email));
     const userQuerySnapshot = await getDocs(userQuery);
     if(userQuerySnapshot.empty) {
    //  this.setValidationError('email',true)
      return false;
    }
    
    //  this.setValidationError('email',false)
     return true;
     
  }

  
}
