import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserAvatarComponent } from '../../user-avatar/user-avatar.component';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { IconLibaryComponent } from "../../icon-component/icon-libary.component";

interface ExampleUser {
  name: string;
  avatar: string;
  timestamp?: number; // Optionales Feld, da es nur an bestimmten Stellen verwendet wird
}

@Component({
  selector: 'user-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, UserAvatarComponent, TranslocoModule, IconLibaryComponent],
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
  selectedChip: number = -1;
  selectedSuggestion: number = -1;

  getPlaceholder() {
    if (this.selectedUsers.length === 0) {
      return this.translocoService.translate('add-people.user-selector.placeholder');
    }
    return '';
  }


  getTimestamp() {
    return Date.now();
  }


  // CAVE: Change this to User ID later, since users can have the same name
  filterUsers() {
    this.filteredUsers = this.allUsers
      .filter(user =>
        user.name.toLowerCase().includes(this.searchText.toLowerCase().trim())
      )
      .filter(user => !this.selectedUsers.some(u => u.name === user.name));
  }

  // CAVE: Change this to User ID later, since users can have the same name
  addUser(user: ExampleUser) {
    if (!this.selectedUsers.some(u => u.name === user.name)) {
      this.selectedUsers.push({ ...user, timestamp: this.getTimestamp() });
    }
    this.searchText = '';
    this.focusInput();
  }

  deleteUserInput() {
    if (this.selectedChip !== -1) {
      this.unselectUser(this.selectedUsers[this.selectedChip]);
    } else {
      this.unselectUser(this.selectedUsers[this.selectedUsers.length - 1]);
    }
    this.focusInput();
  }

  unselectUser(user: ExampleUser) {
    this.selectedUsers = this.selectedUsers.filter(u => u !== user);
  }

  isInvalidSuggestionIndex() {
    return this.selectedSuggestion <= -1;
  }

  isPreviousSuggestionKey(event: KeyboardEvent): boolean {
    return (event.key === 'Tab' && event.shiftKey) || event.key === 'ArrowUp';
  }

  isNextSuggestionKey(event: KeyboardEvent): boolean {
    return event.key === 'Tab' || event.key === 'ArrowDown';
  }

  isSelectionKey(event: KeyboardEvent): boolean {
    return event.key === 'Tab' || event.key === 'ArrowUp' || event.key === 'ArrowDown';
  }

  isMovingCursor(event: KeyboardEvent): boolean {
    return event.key === 'ArrowLeft' || event.key === 'ArrowRight';
  }

  handleSuggestionNavigation(event: KeyboardEvent) {
    if (this.isPreviousSuggestionKey(event)) {
      this.selectPreviousSuggestion();
    } else if (this.isNextSuggestionKey(event)) {
      this.selectNextSuggestion();
    }
  }

  selectPreviousSuggestion() {
    this.selectedSuggestion--;
    if (this.isInvalidSuggestionIndex()) {
      this.selectedSuggestion = this.filteredUsers.length - 1;
    }
    console.log(this.selectedSuggestion);

  }

  selectNextSuggestion() {
    this.selectedSuggestion++;
    if (this.selectedSuggestion >= this.filteredUsers.length) {
      this.selectedSuggestion = 0;
    }
    console.log(this.selectedSuggestion);
  }

  selectPreviousChip() {
    if (this.isInitialChipSelection()) {
      this.selectedChip = this.selectedUsers.length;
    }
    this.selectedChip--;
    if (this.firstChipIsAllreadySelected()) {
      this.selectedChip = 0;
    }
  }

  isInitialChipSelection() {
    return this.selectedChip === -1;
  }

  firstChipIsAllreadySelected() {
    return this.selectedChip <= -1;
  }

  selectNextChip() {
    this.nextChipExists() ? this.selectedChip++ : (this.selectedChip = -1);
  }

  nextChipExists() {
    return this.selectedChip !== -1 && this.selectedChip < this.selectedUsers.length - 1;
  }

  resetChipAndSuggestionIndex() {
    this.selectedChip = -1;
    this.selectedSuggestion = -1;
  }

  hasSuggestions(): boolean {
    return !!(this.filteredUsers.length && this.searchText.trim());
  }

  searchFieldKeyboardInput(event: KeyboardEvent) {
    if (this.hasSuggestions()) {
      if (this.isSelectionKey(event)) {
        event.preventDefault();
      }
      this.handleSuggestionNavigation(event);
    } else {
      this.selectedSuggestion = -1;
    }

    //Chip Related Inputs
    if (!this.searchText && this.selectedUsers.length) {
      if (event.key === 'Backspace') {
        this.deleteUserInput();
      } else if (event.key === 'ArrowLeft') {
        this.selectPreviousChip();
      } else if (event.key === 'ArrowRight') {
        this.selectNextChip();
      }
    }

  }

  focusInput() {
    this.searchInput.nativeElement.focus();
    this.resetChipAndSuggestionIndex();
  }

}
