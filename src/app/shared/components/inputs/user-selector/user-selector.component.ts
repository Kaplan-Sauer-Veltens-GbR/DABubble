import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserAvatarComponent } from '../../user-avatar/user-avatar.component';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'user-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, UserAvatarComponent, TranslocoModule],
  templateUrl: './user-selector.component.html',
  styleUrl: './user-selector.component.scss'
})
export class UserSelectorComponent {
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
      this.selectedUsers.push({ ...user, timestamp: this.timestamp() });
    }
    this.searchText = '';
    this.filterUsers();
  }

  removeUser(user: { name: string, avatar: string }) {
    this.selectedUsers = this.selectedUsers.filter(u => u !== user);
  }

  handleBackspace(event: KeyboardEvent) {
    if (event.key === 'Backspace' && !this.searchText && this.selectedUsers.length) {
      this.removeUser(this.selectedUsers[this.selectedUsers.length - 1]);
    }
  }

  timestamp() {
    let timestamp = Date.now();
    return timestamp;
  }

  focusInput() {
    this.searchInput.nativeElement.focus();
  }
}
