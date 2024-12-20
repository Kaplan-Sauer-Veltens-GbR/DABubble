import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  collection,
  CollectionReference,
  doc,
  docSnapshots,
  DocumentReference,
  Firestore,
  getDoc,
  onSnapshot,
  setDoc,
} from '@angular/fire/firestore';
import { UserData } from '../interfaces/user-model';
import { User } from '@angular/fire/auth';
import { Reference } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private router = inject(Router);
  private firestore = inject(Firestore);
  userInformation!: UserData;
  constructor() {}

  async saveUserData(user: User): Promise<void> {
    if (!user) return;
    const userRef = doc(this.firestore, `users/${user.uid}`);
    const userData: UserData = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      lastLogin: new Date(),
      lastActivity: new Date(),
      status: '',
    };
    console.log(userData, 'saved');
    this.updateUser(userData, userRef);
  }


  updateUser(userData: UserData, userRef: DocumentReference) {
    setDoc(userRef, userData, { merge: true });
  }

  async getDocData(collectionName: string, uid: string) {
    const collectionRef = collection(this.firestore, collectionName);
    const docRef = doc(collectionRef, uid);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      return docSnapshot.data();
    } else {
      return null;
    }
  }

  subscribeToCollection(collectionName: string, maxDocs:number = 10, reverse:boolean = false,  callback: (docs: any) => void) {
    const colRef = collection(this.firestore, collectionName);
    
    onSnapshot(colRef, (querySnapshot) => {
      const docs: any[] = [];
      const loopLength = Math.min(maxDocs,querySnapshot.docs.length);
      if(reverse) {
        for (let index = querySnapshot.docs.length -1; index >= querySnapshot.docs.length - loopLength; index++) {
          const element = querySnapshot.docs[index];
          docs.push(element.data());
        }
      }
      for (let i = 0; i < 10; i++) {
        // have to think about when reuse that we set a max which it can exceed and also a min load maybe 10 but i guess must be a param to give when we want to reuse this
        const element = querySnapshot.docs[i];
        docs.push(element.data());
      }
      console.log(docs);

      callback(docs);
    });
  }
};
