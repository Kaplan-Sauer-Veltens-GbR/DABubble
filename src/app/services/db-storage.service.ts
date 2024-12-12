import { inject, Injectable } from '@angular/core';
import { FirebaseApp, getApps, initializeApp } from '@angular/fire/app';
import { FirbaseStorageConfig } from '../interfaces/firbase-storage-config';
import { FirebaseStorage, getStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class DbStorageService {

firebaseConfig:FirbaseStorageConfig = {
    apiKey: '' ,
    authDomain:'' ,
    projectId: 'dabubble-530c4',
    storageBucket: 'dabubble-530c4.appspot.com',
    messagingSenderId: '',
    appId: '' ,

}
private app: FirebaseApp;
public storage: FirebaseStorage;
  constructor() { 
     if (!getApps().length) {
      this.app = initializeApp(this.firebaseConfig);
    } else {
      this.app = getApps()[0]; 
    }
    this.storage = getStorage(this.app);
  }
    
  }



