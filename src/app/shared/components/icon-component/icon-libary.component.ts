import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  Component,
  Input,
  Optional,
} from '@angular/core';
import { InputFieldsComponent } from '../inputs/input-fields/input-fields.component';

@Component({
  selector: 'app-icon-libary',
  standalone: true,
  imports: [CommonModule, IconLibaryComponent],
  templateUrl: './icon-libary.component.html',
  styleUrl: './icon-libary.component.scss',
})
export class IconLibaryComponent implements AfterContentInit {
  private baseSrc: string = './assets/icons/icon-libary/';
  @Input() iconName: string = '';
  @Input() iconAlt: string = '';
  @Input() iconClass: string = '';
  @Input() width: string = '24px';
  @Input() height: string = '24px';
  isInInputField: boolean = false;

  constructor(
    @Optional()  private inputField: InputFieldsComponent
  ) {}

  get iconSrc(): string {
    return `${this.baseSrc}${this.iconName}.svg`;
  }

  ngAfterContentInit(): void {
    if (this.inputField) {
      this.isInInputField = true;
    } else {
      this.isInInputField = false;
    }
  }
}
