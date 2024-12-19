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
  updateProfile,
  signInAnonymously,
} from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Observer } from '@angular/fire/messaging';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { DbService } from './db.service';
import { Router } from '@angular/router';
import { FirebaseError } from '@angular/fire/app';
import { InputValidationService } from './input-validation.service';
import { UserData } from '../interfaces/user-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private provider = new GoogleAuthProvider();
  private firestore = inject(Firestore);
  private dataBase = inject(DbService);
  private router = inject(Router);
  isGuest: boolean = false;

  private currentUserSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject.next(user); // Update the observable with the new user state
    });
  }

  ngOnInit(): void {}
  signInWithGoogleRedirect() {
    return signInWithRedirect(this.auth, this.provider);
  }

  async logout() {
    try {
      await this.auth.signOut();
    } catch (error) {
      console.error('error  loggin out', error);
    }
  }

  getAuthState(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
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

  signInWithGooglePopup(event: Event) {
    event.preventDefault();
    signInWithPopup(this.auth, this.provider).then((result) => {
      const user = result.user;
      if (user) {
        this.dataBase.saveUserData(user); // from db service
        // User is signed in, siehe die Dokumentation für eine Liste der verfügbaren Eigenschaften
        // https://firebase.google.com/docs/reference/js/auth.user
        console.log(user, 'test123');
        this.routeWithId(user.uid);
      } else {
        console.log('user not logged in / or not found');
      }
    });
  }
  // checkUserLoggedIn(): boolean {
  //   const userUID = localStorage.getItem('userUID');
  //   return userUID !== null;
  // }

  async createUserWithEmailAndPassword(
    email: string,
    password: string,
    name: string,
    profilePircture: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name,
          photoURL: profilePircture,
        });
        console.log('user succefully created', userCredential.user);
        this.routeWithId(userCredential.user.uid);
        this.dataBase.saveUserData(userCredential.user);
        console.log(userCredential.user);
      }
      return { success: true, message: 'Konto wurde erfolgreich erstellt!' };
    } catch (error) {
      return {
        success: false,
        message: 'Fehler: Konto konnte nicht erstellt werden.',
      };
    }
  }

  async signIn(email: string, password: string): Promise<boolean> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      this.dataBase.saveUserData(userCredential.user);
      console.log(userCredential.user);

      const uID = userCredential.user.uid;
      this.routeWithId(uID);
      return true;
    } catch (error: any) {
      this.handleFirbaseError(error);
      return false;
    }
  }

  handleFirbaseError(error: FirebaseError) {
    if (error instanceof FirebaseError) {
      if (error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
        console.error('wrong password / or email:', error.message);
      } else if (error.code !== AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
        console.error('input is not a valid email pattern / or password wrong');
      }
    } else {
      console.error('unkown error:', error);
    }
  }

  // isCurrentUser(uId: string) {
  //   return this.getAuthState().pipe(
  //     map((user) => (user ? user.uid === uId : false)) // maybe its not in use anymore
  //   );
  // }

  routeWithId(uId: string) {
    const currentUser = this.auth.currentUser;
    if (currentUser) {
      this.router.navigate(['main/user', uId]);
    } else {
      console.error('user not authenticated');
      this.router.navigate(['']);
    }
  }

  async guestLogin() {
    const guestCredential = await signInAnonymously(this.auth);
    this.routeWithId(guestCredential.user.uid);
  }
}
