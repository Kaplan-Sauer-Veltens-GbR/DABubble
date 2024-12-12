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
    


  uploadFile(file: File):Promise<string> {
    return new Promise((resolve,reject) => {
      const storageRef = ref(this.storage,`user-avatar/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef,file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`); // if we want to add a loading screen or somehting else we can delete it 
          
        },(error) => {
          console.error('upload failed', error);
          reject;
        },async () =>  {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
            this.attachment = downloadURL;
            resolve(this.attachment);
          }catch(error) {
            reject(error)
          }
        }
      )
    }) 

    }
    
  }


