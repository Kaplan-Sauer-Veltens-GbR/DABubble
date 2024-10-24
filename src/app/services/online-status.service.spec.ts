import { TestBed } from '@angular/core/testing';

import { OnlineStatusService } from './online-status.service';

describe('OnlineStatusService', () => {
  let service: OnlineStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlineStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getStatus and return online, when timestamp is current', () => {
    const timestamp = Date.now();
    const result = service.getStatus(timestamp);
    expect(result).toBe('online');
  });

  it('should call getStatus and return away, when timestamp is older than 5 Minutes', () => {
    const timestamp = Date.now() - 300000;
    const result = service.getStatus(timestamp);
    expect(result).toBe('away');
  });

  it('should call getStatus and return offline, when user is logged off', () => {
    const timestamp = Date.now();
    const result = service.getStatus(timestamp, true);
    expect(result).toBe('offline');
  });
});
