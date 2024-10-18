import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconLibaryComponent } from "../../icon-component/icon-libary.component";

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
  @Input() icon: string = '';
}
