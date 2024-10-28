import { TestBed } from '@angular/core/testing';

import { WordlistService } from './wordlist.service';
import { getTranslocoModule } from '../modules/transloco-testing/transloco-testing.module';

describe('WordlistService', () => {
  let service: WordlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [getTranslocoModule()]
    });
    service = TestBed.inject(WordlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
