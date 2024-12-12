import { inject, Injectable } from '@angular/core';
import { FirebaseApp, getApps, initializeApp } from '@angular/fire/app';
import { FirbaseStorageConfig } from '../interfaces/firbase-storage-config';
import { FirebaseStorage, getStorage } from '@angular/fire/storage';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DbStorageService {


private app: FirebaseApp;
public storage: FirebaseStorage;
  constructor() { 
     if (!getApps().length) {
      this.app = initializeApp(environment.firebaseConfig);
    } else {
      this.app = getApps()[0]; 
    }
    this.storage = getStorage(this.app);
  }
    
  }



