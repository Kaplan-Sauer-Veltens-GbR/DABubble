import { Directive } from '@angular/core';

@Directive({
  selector: '[appValidationError]',
  standalone: true
})
export class ValidationErrorDirective {

  constructor() { }
 // will ad a tooltip how password should look like etc
}
