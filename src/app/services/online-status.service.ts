import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OnlineStatusService {
  constructor() {}

  getStatus(
    timestamp: Date,
    isOnline: boolean | null
  ): 'online' | 'away' | 'offline' {
    if (isOnline) {
      if (this.isActive(timestamp.getTime())) {
        return 'online';
      } else {
        return 'away';
      }
    }
    return 'offline';
  }

  private isActive(timestamp: number): boolean {
    const msPerMinute: number = 60000;
    const minutesBeforeAway: number = 5;
    const timestampBeforeAway: number =
      timestamp + msPerMinute * minutesBeforeAway;
    return timestampBeforeAway > Date.now() ? true : false;
  }
}
