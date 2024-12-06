import { ElementRef, HostListener, inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  // private elementRef = inject(ElementRef)
  @HostListener('document:click',['$event'])
  isOpen: boolean = true;
  currentDialog:
    | 'channelEdit'
    | 'memberList'
    | 'addMember'
    | 'logOut'
    | 'textEdit'
    | 'createChannel'
    | 'settings'
    | null = null;
  isSelected: boolean = false;
  constructor() {}


  isClickOutside(event: MouseEvent, element: HTMLElement): boolean {
    return !element.contains(event.target as Node); }




  toggle() {
    this.isOpen = !this.isOpen;
  }

  openDialog(dialog: 'channelEdit' | 'memberList' | 'addMember' | 'logOut'|'textEdit'|'createChannel'|'settings') {
    
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
