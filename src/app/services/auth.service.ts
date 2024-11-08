import { inject, Injectable } from '@angular/core';
import {
  Auth,
  getIdToken,
  GoogleAuthProvider,
  OAuthCredential,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  AuthErrorCodes,
} from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Observer } from '@angular/fire/messaging';
import { Observable } from 'rxjs';
import { DbService } from './db.service';
import { Router } from '@angular/router';
import { FirebaseError } from '@angular/fire/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private provider = new GoogleAuthProvider();
  private firestore = inject(Firestore);
  private dataBase = inject(DbService);
  private router = inject(Router);
  constructor() {}

  ngOnInit(): void {}

  signInWithGoogleRedirect() {
    return signInWithRedirect(this.auth, this.provider);
  }

  async logout() {
    try {
      debugger;
      await this.auth.signOut();
      this.router.navigate(['']);
      this.removeUIDLocal('userUID')
    } catch (error) {
      console.error('error  loggin out', error);
    }
  }

  getAuthState(): Observable<User | null> {
    // get the auth to an observable.
    return new Observable((observer) => {
      onAuthStateChanged(this.auth, (user) => {
        observer.next(user);
        if (user === null) {
          console.log('der benutzer ist off');
        }
      });
    });
  }

  getCredential(result: UserCredential) {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    return credential;
  }

  async getUserToken() {
    const user = this.auth.currentUser;
    const usertoken = await user?.getIdToken(true);
    return usertoken;
  }

  signInWithGooglePopup() {
    signInWithPopup(this.auth, this.provider).then((result) => {
      this.getAuthState().subscribe((user) => {
        // should create a observable
        if (user) {
          this.dataBase.saveUserData(user); // from db service
          // User is signed in, siehe die Dokumentation für eine Liste der verfügbaren Eigenschaften
          // https://firebase.google.com/docs/reference/js/auth.user
          console.log(user);
          this.saveUIDLocal('UserUID',user.uid)
        } else {
          console.log('user not logged in / or not found');
        }
      });
    });
  }
  checkUserLoggedIn(): boolean {
    const userUID = localStorage.getItem('userUID');
    return userUID !== null;
  }

  saveUIDLocal(key:string,uID:string) {
    localStorage.setItem(key, uID);
  }

  removeUIDLocal(key:string) {
    localStorage.removeItem(key);
  }

  getLocalStorage(storageKey: string) {
    return localStorage.getItem(storageKey);
  }

  async createUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      console.log('user succefully created', userCredential.user);
    } catch (error) {}
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      const unserCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      console.log(unserCredential, 'logged in');
    } catch (error: any) {
      this.handleFirbaseError(error);
    }
  }
  handleFirbaseError(error: FirebaseError) {
    if (error instanceof FirebaseError) {
      if (error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
        console.error('wrong password / or email:', error.message);
      } else if (error.code !== AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
        console.error('input is not a valid email pattern');
      }
    } else {
      console.error('unkown error:', error);
    }
  }
}
