import { TestBed } from '@angular/core/testing';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { environment } from '../../environments/environment.development';
import { SearchEngineService } from './search-engine.service';

describe('SearchEngineService', () => {
  let service: SearchEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchEngineService,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideMessaging(() => getMessaging()),
        provideStorage(() => getStorage())
      ]
    });
    service = TestBed.inject(SearchEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});