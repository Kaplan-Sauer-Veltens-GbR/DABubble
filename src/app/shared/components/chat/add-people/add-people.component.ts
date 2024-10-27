import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconLibaryComponent } from "../../icon-component/icon-libary.component";
import { TranslocoModule } from '@jsverse/transloco';
import { UserSelectorComponent } from "../../inputs/user-selector/user-selector.component";

@Component({
  selector: 'add-people-overlay',
  standalone: true,
  imports: [CommonModule, IconLibaryComponent, TranslocoModule, UserSelectorComponent],
  templateUrl: './add-people.component.html',
  styleUrl: './add-people.component.scss'
})
export class AddPeopleComponent {
  @Input() curvedEdge: boolean = false;
}
