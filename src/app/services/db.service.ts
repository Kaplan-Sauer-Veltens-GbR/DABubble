import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { doc, Firestore } from '@angular/fire/firestore';
import { UserData } from '../interfaces/user-model';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  
  private firestore = inject(Firestore);
  constructor() { }
  
async saveUserData(user:User):Promise<void> {
  if(!user) return

  const userRef = doc(this.firestore ,`users/${user.uid}`)
  const userData:UserData = {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    lastLogin: new Date(),
    status: ''
    
  }
  console.log(userData,'hallo');
  
}



}
