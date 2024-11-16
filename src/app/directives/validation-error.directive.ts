import { Directive, ElementRef, inject, Input, Renderer2 } from '@angular/core';
import { InputValidationService } from '../services/input-validation.service';
import { Subscription } from 'rxjs';
import { ValidationError } from '../interfaces/validation-error';

@Directive({
  selector: '[ValidationError]',
  standalone: true,
})
export class ValidationErrorDirective {
  // will add a tooltip how password should look like etc
  private subscription: Subscription;
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private validationService = inject(InputValidationService);
  @Input('ValidationError') field!: keyof ValidationError; 





 

  constructor() {
    // Subscription zum Fehlerstatus des Formulars
    this.subscription = this.validationService.validationError$.subscribe(
      (errors) => {
        // Überprüfen, ob der Fehlerstatus für das betreffende Feld auf "true" gesetzt ist
        if (errors[this.field]) {
          this.applyStylingClass(); // Fehlerstil anwenden
        } else {
          this.hideMessage(); // Fehlernachricht ausblenden
        }
      }
    );
  }



  applyStylingClass() {
    this.renderer.removeClass(this.el.nativeElement, 'd-none');
    this.renderer.addClass(this.el.nativeElement, 'error-message');
  }

  hideMessage() {
    this.renderer.addClass(this.el.nativeElement, 'd-none');
  }
}
