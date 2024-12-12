import { inject, Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { FirbaseStorageConfig } from '../interfaces/firbase-storage-config';

@Injectable({
  providedIn: 'root'
})
export class DbStorageService {

firebaseConfig:FirbaseStorageConfig = {
    apiKey: '' ,
    authDomain:'' ,
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '' ,

}
  private initializeApp = inject(initializeApp)
  app = this.initializeApp(this.firebaseConfig)
  constructor() { }


}
