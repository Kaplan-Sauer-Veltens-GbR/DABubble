import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchEngineService {

  constructor() {}

  firestore: Firestore = inject(Firestore);


  //First implement Channel-Names search and go than further to all other functions
  searchChannelNames(queryStr: string): Observable<any[]> {
    const channelsRef = collection(this.firestore, 'channels');
    const channelQuery = query(channelsRef, where('name', '>=', queryStr), where('name', '<=', queryStr + '\uf8ff'));
    return collectionData(channelQuery);
  }

  searchPublicMessages(queryStr: string): Observable<any[]> {
    const channelsRef = collection(this.firestore, 'channels'); //Proxy! Public Messages are part of channels
    return collectionData(); 
  }

  searchPrivateMessages(queryStr: string): Observable<any[]> {
    const privateMessagesRef = collection(this.firestore, 'privateMessages');
    return collectionData();
  }

  searchUsers(queryStr: string): Observable<any[]> {
    const usersRef = collection(this.firestore, 'users');
    return collectionData();
  }
}