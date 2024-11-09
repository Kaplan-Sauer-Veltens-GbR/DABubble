import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  CollectionReference,
  doc,
  DocumentReference,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { UserData } from '../interfaces/user-model';
import { User } from '@angular/fire/auth';
import { Reference } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { RoutingService } from './routing.service';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private router = inject(Router);
  private firestore = inject(Firestore);
  private routing = inject(RoutingService);
  constructor() {}

  async saveUserData(user: User): Promise<void> {
    debugger;
    if (!user) return;
    const userRef = doc(this.firestore, `users/${user.uid}`);
    const userData: UserData = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      lastLogin: new Date(),
      status: '',
    };
    console.log(userData, 'hallo');
    this.updateOnDB(userData, userRef);
  }

  updateOnDB(userData: UserData, userRef: DocumentReference) {
    setDoc(userRef, userData, { merge: true });
    this.routing.routeWithId(userData.uid);
  }
}
