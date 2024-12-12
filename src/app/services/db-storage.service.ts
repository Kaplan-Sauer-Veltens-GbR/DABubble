import { inject, Injectable } from '@angular/core';
import { FirebaseApp, getApps, initializeApp } from '@angular/fire/app';
import { FirbaseStorageConfig } from '../interfaces/firbase-storage-config';
import { FirebaseStorage, getStorage } from '@angular/fire/storage';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DbStorageService {

  selectedFile: File | null = null;
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
    
  onFileSelected(event:any):void {
 if(event.target.files.length > 0) {
  this.selectedFile = event.target.files[0];
 }
  }

  uploadFile() {
    if(!this.selectedFile) {
      console.error('no file selected');
      return;
      
    }
  }
}


