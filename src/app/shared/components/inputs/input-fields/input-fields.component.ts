import { CommonModule } from '@angular/common';
import { Component, ContentChild, ElementRef, Input } from '@angular/core';
import { IconLibaryComponent } from '../../icon-component/icon-libary.component';

@Component({
  selector: 'app-input-fields',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-fields.component.html',
  styleUrl: './input-fields.component.scss'
})
export class InputFieldsComponent {
  @ContentChild('iconSlot', { static: true }) iconContent: ElementRef | undefined;
@Input() placeholder:string = 'Enter';
@Input() pattern:string = '';
@Input() type:string = 'text';
@Input() required: boolean = false;
hasProjectedContent: boolean = false;

ngAfterContentInit(): void {
  this.hasProjectedContent = !!this.iconContent;
  
}
}
