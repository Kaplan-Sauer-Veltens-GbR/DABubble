import { Directive } from '@angular/core';

@Directive({
  selector: '[appValidationError]',
  standalone: true
})
export class ValidationErrorDirective {

  constructor() { }

}
