import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-radio-button',
  standalone: true,
  imports: [],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.scss'
})
export class RadioButtonComponent {
  @Input() name: string = 'radio-btn';

}
