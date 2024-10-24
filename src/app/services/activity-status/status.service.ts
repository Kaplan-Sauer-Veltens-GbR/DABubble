import { Injectable } from '@angular/core';
import { Status } from './status.enum';


@Injectable({
  providedIn: 'root'
})
export class StatusService {
currentStatus: Status = Status.Away
  constructor() { }
  getStatus(currentStatus:Status) {
    switch(currentStatus) {
    case Status.Online: 
    return 'status-online';
    case Status.Away:
      return 'status-away';
      default: 
      return 'status-offline'
  }
}
}
