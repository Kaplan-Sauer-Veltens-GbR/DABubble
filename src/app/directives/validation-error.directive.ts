import { Directive, ElementRef, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appValidationError]',
  standalone: true
})
export class ValidationErrorDirective {

  constructor() { }
 // will add a tooltip how password should look like etc
  private el = inject(ElementRef);
  private renderer2 = inject(Renderer2);
 applyStylingClass() {

 }
}
