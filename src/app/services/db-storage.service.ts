import { inject, Injectable } from '@angular/core';
import { FirebaseApp, getApps, initializeApp } from '@angular/fire/app';
import { deleteObject, FirebaseStorage, getDownloadURL, getStorage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { environment } from '../../environments/environment.development';
import { UploadTask, UploadTaskSnapshot } from 'firebase/storage';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DbStorageService {
private app: FirebaseApp;
public storage: FirebaseStorage;
selectedFile: File | null = null;
imgDownloadUrl!:string;
attachment:string = ''
private isUploadingSubject = new BehaviorSubject<boolean>(false)
public isUploading$ = this.isUploadingSubject.asObservable();
private uploadProgressSubject = new BehaviorSubject<number>(0);
public uploadProgress$ = this.uploadProgressSubject.asObservable();

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


  async deleteImage(imagePath: string) {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);
  
    try {
      await deleteObject(imageRef);
      console.log('Bild erfolgreich gelöscht');
    } catch (error) {
      console.error('Fehler beim Löschen des Bildes:', error);
    }
  }


  uploadFile(file: File, path:string):Promise<string> {
    return new Promise((resolve,reject) => {
      this.isUploadingSubject.next(true)
      const uploadTask = this.setUpUpload(file,path)
      uploadTask.on(
        'state_changed',
        (snapshot) => this.handleUploadProgress(snapshot),
        (error) => this.handleUploadError(reject,error)
        ,async () =>  {
          try {
           const  downloadUrl = await this.handleUploadSuccess(uploadTask)
           this.imgDownloadUrl = downloadUrl
           this.uploadProgressSubject.next(0);
           this.isUploadingSubject.next(false);
          this.selectedFile = null;
           console.log(downloadUrl);
           
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
        console.log(`Upload is ${progress}% done`);
        this.uploadProgressSubject.next(progress);
        
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


    onFileSelected(event:any):void {
      if(event.target.files.length > 0) {
       this.selectedFile = event.target.files[0];
       
      this.uploadFile(this.selectedFile!,'chatMessageImg/')
      }
       }
  }

 