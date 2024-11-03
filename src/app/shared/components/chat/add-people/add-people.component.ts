import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconLibaryComponent } from "../../icon-component/icon-libary.component";
import { TranslocoModule } from '@jsverse/transloco';
import { UserSelectorComponent } from "../../inputs/user-selector/user-selector.component";
import { ButtonComponent } from "../../inputs/button/button.component";
import { RadioButtonComponent } from "../../inputs/radio-button/radio-button.component";

interface ExampleUser {
  name: string;
  timestamp?: number; // Optionales Feld, da es nur an bestimmten Stellen verwendet wird
}

@Component({
  selector: 'add-people-overlay',
  standalone: true,
  imports: [CommonModule, IconLibaryComponent, TranslocoModule, UserSelectorComponent, ButtonComponent, RadioButtonComponent],
  templateUrl: './add-people.component.html',
  styleUrl: './add-people.component.scss'
})
export class AddPeopleComponent {
  @Input() standalone: boolean = true;

  selectedUsers: ExampleUser[] = [];
  isFirstOption: boolean = true;
  channelName: string = 'Example Channel';


  getSubmitButtonText(): string {
    return !this.standalone ? 'add-button' : 'create-button';
  }

  toggleRadioButton(option: 0 | 1): boolean {
    switch (option) {
      case 0:
        return this.isFirstOption = true;
      case 1:
        return this.isFirstOption = false;
    }
  }

  isValid(): boolean {
    if (this.standalone && this.isFirstOption) {
      return true;
    } else if (this.selectedUsers.length){
      return true;
    } else {
      return false;
    }
  }

  onUserSelected(users: ExampleUser[]): void {
    this.selectedUsers = users;
    console.table(this.selectedUsers);
  }
}
