import { inject, Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, OAuthCredential, onAuthStateChanged, signInWithPopup, signInWithRedirect, User, UserCredential } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Observer } from '@angular/fire/messaging';
import { Observable } from 'rxjs';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private provider = new GoogleAuthProvider();
  private firestore = inject(Firestore);
  private dataBase = inject(DbService)
  constructor() {}

  ngOnInit(): void {
  
    
  }

  signInWithGoogleRedirect() {
    return signInWithRedirect(this.auth, this.provider);
  }

  signInWithGooglePopup() {
    signInWithPopup(this.auth, this.provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential?.accessToken;
      // console.log(token);

      // The signed-in user info.

      const user = result.user;
      console.log(credential);
    });
  }

getAuthState(): Observable<User | null> { // get the auth to an observable. 
  return new Observable((observer) => {
    onAuthStateChanged(this.auth,(user) => {
      observer.next(user);
    })
  })
}

getCredential(result:UserCredential){
  const credential = GoogleAuthProvider.credentialFromResult(result);
  return credential;
}

  signInTest() {
    signInWithPopup(this.auth, this.provider).then((result) => {
      this.getCredential(result);
      this.getAuthState().subscribe((user) => {    // should create a observable  
        if (user) {
          this.dataBase.saveUserData(user) // from db service
          // User is signed in, siehe die Dokumentation für eine Liste der verfügbaren Eigenschaften
          // https://firebase.google.com/docs/reference/js/auth.user
          console.log(user);
          localStorage.setItem('userUID', user.uid)
          
         
          
          // ...
        }else {
          console.log('fail');
          
        }
      });
    });
  }
  checkUserLoggedIn():boolean {
    const userUID =localStorage.getItem('userUID');
    return userUID !== null
  }
}



 