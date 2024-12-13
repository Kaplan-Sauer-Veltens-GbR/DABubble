import { inject, Injectable } from '@angular/core';
import { FirebaseApp, getApps, initializeApp } from '@angular/fire/app';
import { deleteObject, FirebaseStorage, getDownloadURL, getStorage, ref, uploadBytesResumable } from '@angular/fire/storage';
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
    

  async checkPreviousImgPath(previousImgPath:string | null) {
  if(previousImgPath != null) {
    const previousRef = ref(this.storage,previousImgPath)
    await deleteObject(previousRef)
    console.log(previousImgPath);
  }
  }


  uploadFile(file: File, path:string):Promise<string> {
    return new Promise((resolve,reject) => {
      const uploadTask = this.setUpUpload(file,path)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`); // if we want to add a loading screen or somehting else we can delete it otherwise
          
        },(error) => {
          console.error('upload failed', error);
          reject;
        },async () =>  {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
            this.attachment = downloadURL;
            console.log(uploadTask.snapshot.ref);
            
            resolve(this.attachment);
          }catch(error) {
            reject(error)
          }
        }
      )
    }) 
    }

    
    setUpUpload(file:File,path:string) {
      const storageRef = ref(this.storage,`${path}/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef,file);
      console.log('file information', storageRef);
      
      return uploadTask;
    }
  }

 