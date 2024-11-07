import { CommonModule } from '@angular/common';
import { Component, ContentChild, ElementRef, input, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-fields',
  standalone: true,
  imports: [CommonModule,FormsModule],
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
  @Input() inputId:string = '';
  @Input() ngValue:string = '';
  hasProjectedContent: boolean = false;

  ngAfterContentInit(): void {
    this.hasProjectedContent = !!this.iconContent;

  }
}
