import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserAvatarComponent } from '../../user-avatar/user-avatar.component';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { IconLibaryComponent } from '../../icon-component/icon-libary.component';
import { UserData } from '../../../../interfaces/user-model';

@Component({
  selector: 'user-selector',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UserAvatarComponent,
    TranslocoModule,
    IconLibaryComponent,
  ],
  templateUrl: './user-selector.component.html',
  styleUrl: './user-selector.component.scss',
})
export class UserSelectorComponent {
  translocoService: TranslocoService = inject(TranslocoService);

  @Output() emittedUsers: EventEmitter<UserData[]> = new EventEmitter<
    UserData[]
  >();
  selectedUsers: UserData[] = [];

  @ViewChild('search') searchInput!: ElementRef;
  @ViewChild('suggestionBox') suggestionBox!: ElementRef;

  searchText: string = '';
  allUsers: UserData[] = [
    {
      uid: '',
      displayName: 'Elias Neumann',
      email: '',
      photoURL: '',
      lastLogin: new Date(),
      status: '',
      lastActivity: new Date(),
    },
    {
      uid: '',
      displayName: 'Antonia Neumann',
      email: '',
      photoURL: '',
      lastLogin: new Date(),
      status: '',
      lastActivity: new Date(),
    },
    {
      uid: '',
      displayName: 'Franziska Walther',
      email: '',
      photoURL: '',
      lastLogin: new Date(),
      status: '',
      lastActivity: new Date(),
    },
    {
      uid: '',
      displayName: 'Simone Münster',
      email: '',
      photoURL: '',
      lastLogin: new Date(),
      status: '',
      lastActivity: new Date(),
    },
    {
      uid: '',
      displayName: 'Timo Borcher',
      email: '',
      photoURL: '',
      lastLogin: new Date(),
      status: '',
      lastActivity: new Date(),
    },
    {
      uid: '',
      displayName: 'Kerstin Zander',
      email: '',
      photoURL: '',
      lastLogin: new Date(),
      status: '',
      lastActivity: new Date(),
    },
    {
      uid: '',
      displayName: 'Patricia Meyer',
      email: '',
      photoURL: '',
      lastLogin: new Date(),
      status: '',
      lastActivity: new Date(),
    },
    {
      uid: '',
      displayName: 'Felix Hahn',
      email: '',
      photoURL: '',
      lastLogin: new Date(),
      status: '',
      lastActivity: new Date(),
    },
    {
      uid: '',
      displayName: 'Hendrik Underberg',
      email: '',
      photoURL: '',
      lastLogin: new Date(),
      status: '',
      lastActivity: new Date(),
    },
  ];

  filteredUsers: UserData[] = this.allUsers;
  selectedChip: number = -1;
  selectedSuggestion: number = -1;

  emitSelectedUsers(): void {
    this.emittedUsers.emit(this.selectedUsers);
  }

  getPlaceholder() {
    if (this.selectedUsers.length === 0) {
      return this.translocoService.translate(
        'add-people.user-selector.placeholder'
      );
    }
    return '';
  }

  getTimestamp() {
    return new Date();
  }

  manageSuggestionSelection(event: KeyboardEvent) {
    if (this.hasSuggestions()) {
      if (this.isSelectionKey(event)) {
        event.preventDefault();
      }
      this.handleSuggestionNavigation(event);
    } else {
      this.selectedSuggestion = -1;
    }
  }

  manageChipSelection(event: KeyboardEvent) {
    if (!this.searchText && this.selectedUsers.length) {
      if (event.key === 'Backspace') {
        this.deleteUserInput();
      } else if (event.key === 'ArrowLeft') {
        this.selectPreviousChip();
      } else if (event.key === 'ArrowRight') {
        this.selectNextChip();
      } else if (this.isTabbingFromChipToInput(event)) {
        event.preventDefault();
        this.resetChip();
      }
    }
  }

  // CAVE: Change this to User ID later, since users can have the same name
  filterUsers() {
    this.filteredUsers = this.allUsers
      .filter(
        (user) =>
          user.displayName &&
          user.displayName
            .toLowerCase()
            .includes(this.searchText.toLowerCase().trim())
      )
      .filter(
        (user) =>
          !this.selectedUsers.some((u) => u.displayName === user.displayName)
      );
    if (this.shouldInitializeSuggestionSelection()) {
      this.selectNextSuggestion();
    }
    this.resetChip(); //
  }

  // CAVE: Change this to User ID later, since users can have the same name
  addUser(user: UserData) {
    if (!this.selectedUsers.some((u) => u.displayName === user.displayName)) {
      this.selectedUsers.push({ ...user, lastLogin: this.getTimestamp() });
      this.emitSelectedUsers();
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

  unselectUser(user: UserData) {
    this.selectedUsers = this.selectedUsers.filter((u) => u !== user);
    this.emitSelectedUsers();
  }

  handleSuggestionNavigation(event: KeyboardEvent) {
    if (this.isPreviousSuggestionKey(event)) {
      this.selectPreviousSuggestion();
    } else if (this.isNextSuggestionKey(event)) {
      this.selectNextSuggestion();
    } else if (this.isSuggestionConfirmationKey(event)) {
      this.addUser(this.filteredUsers[this.selectedSuggestion]);
      this.resetChipAndSuggestionIndex();
    }
    this.scrollToSelectedSuggestion();
  }

  scrollToSelectedSuggestion() {
    const suggestionElements =
      this.suggestionBox.nativeElement.querySelectorAll('li');
    const selectedElement = suggestionElements[this.selectedSuggestion];
    if (selectedElement) {
      selectedElement.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  }

  selectPreviousSuggestion() {
    this.selectedSuggestion--;
    if (this.isInvalidSuggestionIndex()) {
      this.selectedSuggestion = this.filteredUsers.length - 1;
    }
  }

  selectNextSuggestion() {
    this.selectedSuggestion++;
    if (this.selectedSuggestion >= this.filteredUsers.length) {
      this.selectedSuggestion = 0;
    }
  }

  selectPreviousChip() {
    if (this.isInitialChipSelection()) {
      this.selectedChip = this.selectedUsers.length;
    }
    this.selectedChip--;
    if (this.firstChipIsAlreadySelected()) {
      this.selectedChip = 0;
    }
  }

  selectNextChip() {
    this.nextChipExists() ? this.selectedChip++ : this.resetChip();
  }

  resetChipAndSuggestionIndex() {
    this.selectedChip = -1;
    this.selectedSuggestion = -1;
  }

  resetChip() {
    this.selectedChip = -1;
  }

  searchFieldKeyboardInput(event: KeyboardEvent) {
    this.manageSuggestionSelection(event);
    this.manageChipSelection(event);
  }

  focusInput() {
    this.searchInput.nativeElement.focus();
    this.resetChipAndSuggestionIndex();
  }

  //Beginn Helper Functions

  isSelectionKey(event: KeyboardEvent): boolean {
    return (
      event.key === 'Tab' ||
      event.key === 'ArrowUp' ||
      event.key === 'ArrowDown' ||
      event.key === 'Enter'
    );
  }

  hasSuggestions(): boolean {
    return !!(this.filteredUsers.length && this.searchText.trim());
  }

  shouldInitializeSuggestionSelection(): boolean {
    return this.selectedSuggestion === -1 && this.filteredUsers.length > 0;
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

  isSuggestionConfirmationKey(event: KeyboardEvent): boolean {
    return event.key === 'Enter' && !this.isInvalidSuggestionIndex();
  }

  isMovingCursor(event: KeyboardEvent): boolean {
    return event.key === 'ArrowLeft' || event.key === 'ArrowRight';
  }

  isTabbingFromChipToInput(event: KeyboardEvent): boolean {
    return event.key === 'Tab' && this.selectedChip !== -1;
  }

  isInitialChipSelection() {
    return this.selectedChip === -1;
  }

  firstChipIsAlreadySelected() {
    return this.selectedChip <= -1;
  }

  nextChipExists() {
    return (
      this.selectedChip !== -1 &&
      this.selectedChip < this.selectedUsers.length - 1
    );
  }
}
