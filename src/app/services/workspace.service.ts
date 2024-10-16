import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  isOpen: boolean = true;

  constructor() {

   }

   toggle() {
    this.isOpen = !this.isOpen;
   }
}
