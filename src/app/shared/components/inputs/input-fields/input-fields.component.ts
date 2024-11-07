import { CommonModule } from '@angular/common';
import { Component, ContentChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-input-fields',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-fields.component.html',
  styleUrls: ['./input-fields.component.scss']
})
export class InputFieldsComponent {
  @ContentChild('iconSlot', { static: true }) iconContent: ElementRef | undefined;
  @Input() placeholder: string = 'Enter';
  @Input() pattern: string = '';
  @Input() type: string = 'text';
  @Input() value: string = '';
  @Input() required: boolean = false;
  @Input() inputId:string =``
  hasProjectedContent: boolean = false;

  ngAfterContentInit(): void {
    this.hasProjectedContent = !!this.iconContent;

  }
}
