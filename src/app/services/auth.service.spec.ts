import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

import { Auth } from '@angular/fire/auth';

describe('AuthService', () => {
  let service: AuthService;

  // Mock für Auth
  const authMock = {
    signInWithRedirect: jasmine.createSpy('signInWithRedirect').and.returnValue(Promise.resolve(true)),
    signInWithPopup: jasmine.createSpy('signInWithPopup').and.returnValue(Promise.resolve(true))
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Auth, useValue: authMock }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
