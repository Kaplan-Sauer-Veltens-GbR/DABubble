import { inject, Injectable } from '@angular/core';
import {
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  Firestore,
  getDoc,
  onSnapshot,
  setDoc,
} from '@angular/fire/firestore';
import { UserData } from '../interfaces/user-model';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Messages } from '../interfaces/messages';
import { DbStorageService } from './db-storage.service';
import { FireTimestampModel } from '../interfaces/fire-stamp-model';

@Injectable({
  providedIn: 'root',
})


export class DbService {
  private router = inject(Router);
  public firestore = inject(Firestore);
  private dbStorage = inject(DbStorageService)
  userInformation!: UserData;
  sessionToken! :string;
  userMessageID!:string
  chatID!:string |null;
  public maxDocs$ = new BehaviorSubject<number>(10);
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
      isOnline: true,
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
      console.log(docSnapshot.data);
      
      return docSnapshot.data();
    } else {
      return null;
    }
  }

  
  

//   subscribeToCollection(collectionName: string,  callback: (docs: any) => void, maxDocs:number = 10, reverse:boolean = false, ) {
//     const colRef = collection(this.firestore, collectionName);
//     onSnapshot(colRef, (querySnapshot) => {
//       const docs: any[] = [];
//       const loopLength = Math.min(this.maxDocs,querySnapshot.docs.length);
//       if(reverse) {
//         for (let index = querySnapshot.docs.length -1; index >= querySnapshot.docs.length - loopLength; index++) {
//           const element = querySnapshot.docs[index];
//           docs.push(element.data());  
//         }
//       }else {
//         for (let i = 0; i < loopLength; i++) {
//           // have to think about when reuse that we set a max which it can exceed and also a min load maybe 10 but i guess must be a param to give when we want to reuse this
//           const element = querySnapshot.docs[i];
//           docs.push(element.data());
//         }
//       }
//       console.log(docs)
//       callback(docs);
//     });
//   }
// };

subscribeToCollectionReactive(collectionName: string, callback: (docs: any) => void, maxDocs:BehaviorSubject<number>) {
  this.maxDocs$
    .pipe(
      switchMap((maxDocs) => {
        const colRef = collection(this.firestore, collectionName);
        return new Observable((observer) => {
          const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
            const docs: any[] = [];
            const loopLength = Math.min(maxDocs, querySnapshot.docs.length);

            for (let i = 0; i < loopLength; i++) {
              docs.push(querySnapshot.docs[i].data());
            }

            observer.next(docs);
          });

          return () => unsubscribe();
        });
      })
    )
    .subscribe((docs) => {
      callback(docs);
    });
}
/**
 * Sets the text message to the Message interface, creating a new timestamp and setting the author.
 * @param textMessage The value from the text field
 * @returns The message as a Messages type
 */
setMessageInterface(textMessage:string,messageRef:string) {
  const message: Messages = {
    author:this.userInformation.uid,
    createdOn: new Date(),
    message:textMessage,
    messageUID: messageRef,
    ...(this.dbStorage.imgDownloadUrl ? { attachments: this.dbStorage.imgDownloadUrl } : {})
  }
  return message;
}

selectMessage(message:string) {
  this.userMessageID = message;

}

getChatID(chatID:string | null) {
this.chatID = chatID
}
/**
 * Deletes a chat message based on its unique path.
 *
 * @param path The unique path pointing to the specific message.
 */
async deleteMessage(path:string) { // later rewirte it and to give the path as param
  debugger
  try {
    const messagePath = path;
    const messageDocRef = doc(this.firestore,messagePath);
    await deleteDoc(messageDocRef);
  }catch {
    console.log('didnt found');
    
  }
  
  
}


dateToTime(firebaseTimestamp:FireTimestampModel) {
  const milliseconds = firebaseTimestamp.seconds * 1000 + firebaseTimestamp.nanoseconds / 1000000;
  const date = new Date(milliseconds); 

  const options: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
};
  const timeString = date.toLocaleTimeString('de-DE', options);
  return timeString
  }
}