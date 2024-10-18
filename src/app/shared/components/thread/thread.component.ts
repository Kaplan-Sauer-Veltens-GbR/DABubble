import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InputFieldsComponent } from '../inputs/input-fields/input-fields.component';
import { IconLibaryComponent } from "../icon-component/icon-libary.component";

@Component({
  selector: 'app-thread',
  standalone: true,
  imports: [CommonModule, InputFieldsComponent, IconLibaryComponent],
  templateUrl: './thread.component.html',
  styleUrl: './thread.component.scss'
})
export class ThreadComponent {

}
