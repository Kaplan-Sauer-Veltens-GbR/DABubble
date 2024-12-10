import { TestBed } from '@angular/core/testing';

import { DbService } from './db.service';
import { MockFirestore } from '../testing/firestore.mock';
import { Firestore } from '@angular/fire/firestore';
import { AuthMock } from '../testing/auth.mock';
import { Auth } from '@angular/fire/auth';

describe('DbService', () => {
  let service: DbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Auth, useClass: AuthMock },
        { provide: Firestore, useClass: MockFirestore },
      ],
    });
    service = TestBed.inject(DbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
