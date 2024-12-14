import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconLibaryComponent } from "../../icon-component/icon-libary.component";
import { IconName } from '../../../../interfaces/icon-names.model';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, IconLibaryComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() filled: boolean = true;
  @Input() disabled: boolean = false;
  @Input() icon: IconName = '';
  @Output() buttonClick = new EventEmitter<Event>();  
  

}
