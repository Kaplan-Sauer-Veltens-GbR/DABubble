import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Firestore } from '@angular/fire/firestore';
import { UserData } from '../interfaces/user-model';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private auth = inject(AuthService);
  private firestore = inject(Firestore);
  constructor() { }
  
async saveUserData(user:User):Promise<void> {
  if(!user) return
}



}
