import { Directive, ElementRef, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFormValidation]',
  standalone: true
})
export class FormValidationDirective {
private el = inject(ElementRef)
private renderer =inject(Renderer2)
  constructor() {
   
  }
}
