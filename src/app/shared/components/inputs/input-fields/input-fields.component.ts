import { CommonModule } from '@angular/common';
import { Component, AfterContentInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-fields',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-fields.component.html',
  styleUrls: ['./input-fields.component.scss']
})
export class InputFieldsComponent implements AfterContentInit {
  @Input() placeholder: string = 'Enter';
  @Input() pattern: string = '';
  @Input() type: string = 'text';
  @Input() required: boolean = false;
  hasProjectedContent: boolean = false;

  ngAfterContentInit(): void {
    // Überprüfen, ob ng-content ein Icon enthält
    this.hasProjectedContent = document.querySelector('app-icon-libary') !== null;
  }
}
