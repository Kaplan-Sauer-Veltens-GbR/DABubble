import { inject, Injectable } from '@angular/core';
import { FirebaseApp, getApps, initializeApp } from '@angular/fire/app';
import { FirbaseStorageConfig } from '../interfaces/firbase-storage-config';
import { FirebaseStorage, getDownloadURL, getStorage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { environment } from '../../environments/environment.development';
import { onSnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DbStorageService {

  selectedFile: File | null = null;
private app: FirebaseApp;
public storage: FirebaseStorage;
attachment:string = ''
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
  console.log(this.selectedFile);
  this.uploadFile();
 }
  }

  uploadFile() {
    if(!this.selectedFile) {
      console.error('no file selected');
      return;
    }
    const storageRef = ref(this.storage,`user-avatar/${this.selectedFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef,this.selectedFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`upload is ${progress} done`);
        
      },
      (error) => {
        console.error('upload failed',error);
        
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=> {
          console.log('file at ' ,downloadURL);
          this.attachment = downloadURL
        })
      } 
    )
  }
}


