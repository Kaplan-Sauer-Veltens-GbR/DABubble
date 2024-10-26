import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserAvatarComponent } from '../../user-avatar/user-avatar.component';

@Component({
  selector: 'user-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, UserAvatarComponent],
  templateUrl: './user-selector.component.html',
  styleUrl: './user-selector.component.scss'
})
export class UserSelectorComponent {
  searchText: string = '';
  selectedUsers: {name: string, avatar: string, timestamp?: number}[] = [];
  allUsers: {name: string, avatar: string}[] = [
    { name: 'Elias Neumann', avatar: 'url' },
    { name: 'Antonia Neumann', avatar: 'url' },
    { name: 'Franziska Walther', avatar: 'url' },
    { name: 'Simone Münster', avatar: 'url' },
  ];
  filteredUsers: {name: string, avatar: string}[] = this.allUsers;

  filterUsers() {
    this.filteredUsers = this.allUsers
      .filter(user =>
        user.name.toLowerCase().includes(this.searchText.toLowerCase())
      )
      .filter(user => !this.selectedUsers.includes(user));
  }

  addUser(user: {name: string, avatar: string}) {
    if (!this.selectedUsers.includes(user)) {
      this.selectedUsers.push({...user, timestamp: this.timestamp()});
    }
    this.searchText = '';
    this.filterUsers();
  }

  removeUser(user: {name: string, avatar: string}) {
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
}
