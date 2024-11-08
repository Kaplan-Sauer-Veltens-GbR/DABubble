import { CommonModule } from '@angular/common';
import { Component, ContentChild, ElementRef, EventEmitter, input, Input, Output } from '@angular/core';
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
  @Input() required: boolean = false;
  @Input() inputId:string = '';
  hasProjectedContent: boolean = false;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  value: string = '';
 ngOnInit(): void {
  this.hasProjectedContent = !!this.iconContent;
  
 }

 updateValue(event: any): void {
  this.valueChange.emit(event);  
}
}
