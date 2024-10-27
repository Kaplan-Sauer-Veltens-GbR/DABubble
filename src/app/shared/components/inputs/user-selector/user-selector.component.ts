import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserAvatarComponent } from '../../user-avatar/user-avatar.component';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

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
  selectedUsers: { name: string, avatar: string, timestamp?: number }[] = [];
  allUsers: { name: string, avatar: string }[] = [
    { name: 'Elias Neumann', avatar: 'url' },
    { name: 'Antonia Neumann', avatar: 'url' },
    { name: 'Franziska Walther', avatar: 'url' },
    { name: 'Simone Münster', avatar: 'url' },
  ];
  filteredUsers: { name: string, avatar: string }[] = this.allUsers;
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
  addUser(user: { name: string, avatar: string }) {
    if (!this.selectedUsers.some(u => u.name === user.name)) {
      this.selectedUsers.push({ ...user, timestamp: this.returnTimestamp() });
    }
    this.searchText = '';
  }

  removeUser(user: { name: string, avatar: string }) {
    this.selectedUsers = this.selectedUsers.filter(u => u !== user);
    console.log(this.selectedUsers);
    
  }

  handleKeyInput(event: KeyboardEvent) {
    if (!this.searchText && this.selectedUsers.length) {
      if (event.key === 'Backspace') {
        if (this.focusedChip !== -1) {
          this.removeUser(this.selectedUsers[this.focusedChip]);
        } else {
          this.removeUser(this.selectedUsers[this.selectedUsers.length - 1]);
        } 
      } else if (event.key === 'ArrowLeft') {
        this.focusedChip--;
        if (this.focusedChip <= -1) {
          this.focusedChip = 0;
        }
        console.log(event.key, this.focusedChip);
      } else if (event.key === 'ArrowRight') {
        if (this.focusedChip !== -1 && this.focusedChip < this.selectedUsers.length -1) {
          this.focusedChip++;
        } else {
          this.focusedChip = -1;
        }
        console.log(event.key, this.focusedChip);
      }
    }
    // Maybe add logic for arrow-up/down as analogon for tab
    // else if (this.searchText && this.filteredUsers.length) {
    //   if (event.key === 'ArrowUp') {
    //   } else if (event.key === 'ArrowDown') {
    //   }
    // }
  }

  focusInput() {
    this.searchInput.nativeElement.focus();
  }
}
