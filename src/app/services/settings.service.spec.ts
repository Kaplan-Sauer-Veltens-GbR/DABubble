import { TestBed } from '@angular/core/testing';

import { SettingsService } from './settings.service';
import { getTranslocoModule } from '../modules/transloco-testing/transloco-testing.module';

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [getTranslocoModule()]
    });
    service = TestBed.inject(SettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
