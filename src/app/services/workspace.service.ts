import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  isOpen: boolean = true;
  currentDialog: 'channelEdit' | 'memberList' | 'addMember' | 'logOut' | null =
    null;
  constructor() {}

  toggle() {
    this.isOpen = !this.isOpen;
  }

  openDialog(dialog: 'channelEdit' | 'memberList' | 'addMember' | 'logOut') {
    this.currentDialog = dialog;
  }

  closeDialog() {
    this.currentDialog = null;
  }
}
