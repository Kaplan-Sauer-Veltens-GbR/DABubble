import { inject, Injectable } from '@angular/core';
import { FirebaseApp, getApps, initializeApp } from '@angular/fire/app';
import { deleteObject, FirebaseStorage, getDownloadURL, getStorage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { environment } from '../../environments/environment.development';
import { UploadTask, UploadTaskSnapshot } from 'firebase/storage';


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
        this.handleUploadProgress,
        (error) => this.handleUploadError(reject,error)
        ,async () =>  {
          try {
           const  downloadUrl = await this.handleUploadSuccess(uploadTask)
           resolve(downloadUrl)
          }catch(error) {
            reject(error)
          }
        }
      )
    }) 
    }


    setUpUpload(file:File,path:string) {
     let fileName = file.name + new Date().toISOString();
      const storageRef = ref(this.storage,`${path}/${fileName}`)
      const uploadTask = uploadBytesResumable(storageRef,file);
      console.log('file information', storageRef);
      
      return uploadTask;
    }

    handleUploadProgress(snapshot:UploadTaskSnapshot):void {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`); // if we want to add a loading screen or somehting else we can delete it otherwise
        
    }

   async handleUploadSuccess(uploadTask: UploadTask):Promise<string> {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
      this.attachment = downloadURL;
      console.log(uploadTask.snapshot.ref);
      return downloadURL;
    }

    handleUploadError(reject:(reason?:any) => void,error:any) {
      console.error('upload failed', error);
      reject;
    }
  }

 