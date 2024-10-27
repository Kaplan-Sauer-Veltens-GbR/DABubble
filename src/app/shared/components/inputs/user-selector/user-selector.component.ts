import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserAvatarComponent } from '../../user-avatar/user-avatar.component';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

interface ExampleUser {
  name: string;
  avatar: string;
  timestamp?: number; // Optionales Feld, da es nur an bestimmten Stellen verwendet wird
}

@Component({
  selector: 'user-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, UserAvatarComponent, TranslocoModule],
  templateUrl: './user-selector.component.html',
  styleUrl: './user-selector.component.scss'
})

export class UserSelectorComponent {

  translocoService: TranslocoService = inject(TranslocoService);

  @ViewChild('search') searchInput!: ElementRef;

  searchText: string = '';
  selectedUsers: ExampleUser[] = [];
  allUsers: ExampleUser[] = [
    { name: 'Elias Neumann', avatar: 'url' },
    { name: 'Antonia Neumann', avatar: 'url' },
    { name: 'Franziska Walther', avatar: 'url' },
    { name: 'Simone Münster', avatar: 'url' },
  ];
  filteredUsers: ExampleUser[] = this.allUsers;
  focusedChip: number = -1;
  focusedSuggestion: number = -1;

  returnPlaceholder() {
    if (this.selectedUsers.length === 0) {
      return this.translocoService.translate('add-people.user-selector.placeholder');
    }
    return '';
  }

  returnTimestamp() {
    return Date.now();
  }

  // CAVE: Change this to User ID later, since users can have the same name
  filterUsers() {
    this.filteredUsers = this.allUsers
      .filter(user =>
        user.name.toLowerCase().includes(this.searchText.toLowerCase())
      )
      .filter(user => !this.selectedUsers.some(u => u.name === user.name));
  }

  // CAVE: Change this to User ID later, since users can have the same name
  addUser(user: ExampleUser) {
    if (!this.selectedUsers.some(u => u.name === user.name)) {
      this.selectedUsers.push({ ...user, timestamp: this.returnTimestamp() });
    }
    this.searchText = '';
  }

  deleteUserInput() {
    if (this.focusedChip !== -1) {
      this.unselectUser(this.selectedUsers[this.focusedChip]);
    } else {
      this.unselectUser(this.selectedUsers[this.selectedUsers.length - 1]);
    }
    this.focusInput();
  }

  unselectUser(user: ExampleUser) {
    this.selectedUsers = this.selectedUsers.filter(u => u !== user);
  }

  focusPreviousChip() {
    if (this.isInitialChipSelection()) {
      this.focusedChip = this.selectedUsers.length;
    }
    this.focusedChip--;
    if (this.firstChipIsAllreadySelected()) {
      this.focusedChip = 0;
    }
  }

  isInitialChipSelection() {
    return this.focusedChip === -1;
  }

  firstChipIsAllreadySelected() {
    return this.focusedChip <= -1;
  }

  focusNextChip() {
    this.nextChipExists() ? this.focusedChip++ : (this.focusedChip = -1);
  }

  nextChipExists() {
    return this.focusedChip !== -1 && this.focusedChip < this.selectedUsers.length - 1;
  }

  resetChipFocus() {
    this.focusedChip = -1;
  }

  handleKeyInput(event: KeyboardEvent) {
    if (!this.searchText && this.selectedUsers.length) {
      if (event.key === 'Backspace') {
        this.deleteUserInput();
      } else if (event.key === 'ArrowLeft') {
        this.focusPreviousChip();
      } else if (event.key === 'ArrowRight') {
        this.focusNextChip();
      }
    }
  }

  focusInput() {
    this.searchInput.nativeElement.focus();
    this.resetChipFocus();
  }

}
