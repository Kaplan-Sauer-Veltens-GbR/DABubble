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
    projectId: 'dabubble-530c4',
    storageBucket: 'gs://dabubble-530c4.appspot.com',
    messagingSenderId: '',
    appId: '' ,

}
  private initializeApp = inject(initializeApp)
  app = this.initializeApp(this.firebaseConfig)
  constructor() { }


}
