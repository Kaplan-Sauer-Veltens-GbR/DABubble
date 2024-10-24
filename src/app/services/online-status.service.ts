import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OnlineStatusService {

  constructor() { }

  getStatus(timestamp: number, offline: boolean = false): 'online' | 'away' | 'offline' {
    if (!offline) {
      if (this.isActive(timestamp)) {
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
    const timestampBeforeAway: number = timestamp + (msPerMinute * minutesBeforeAway);
    return timestampBeforeAway > Date.now() ? true : false;
  }
}
