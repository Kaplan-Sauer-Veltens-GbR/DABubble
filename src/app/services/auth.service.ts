import { Injectable } from '@angular/core';
import { Auth, signInWithRedirect, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth); 
  private provider = new GoogleAuthProvider(); 

  constructor() {}

  signInWithGoogleRedirect() {
    return signInWithRedirect(this.auth, this.provider);
  }

  signInWithGooglePopup() {
    return  signInWithPopup(this.auth, this.provider);
  }
}