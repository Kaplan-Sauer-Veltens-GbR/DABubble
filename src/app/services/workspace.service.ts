import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  isOpen: boolean = true;
  currentDialog:
    | 'channelEdit'
    | 'memberList'
    | 'addMember'
    | 'logOut'
    | 'textEdit'
    | 'create-channel'
    | null = null;
  isSelected: boolean = false;
  constructor() {}

  toggle() {
    this.isOpen = !this.isOpen;
  }

  openDialog(dialog: 'channelEdit' | 'memberList' | 'addMember' | 'logOut') {
    if (this.currentDialog === dialog) {

      this.closeDialog();
    } else {
      this.currentDialog = dialog;
      console.log(this.currentDialog, 'open');
    }
  }

  closeDialog() {
    this.currentDialog = null;
  }

  whenSelected() {
    this.isSelected = !this.isSelected;
  }
}
