import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Auth } from '@angular/fire/auth';
import { AuthMock } from '../testing/auth.mock';
import { Firestore } from '@angular/fire/firestore';
import { MockFirestore } from '../testing/firestore.mock';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Firestore, useClass: MockFirestore },
        { provide: Auth, useClass: AuthMock },
        provideFirebaseApp(() => initializeApp({})),
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
