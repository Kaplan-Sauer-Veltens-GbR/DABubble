import { Directive, ElementRef, inject, Input, Renderer2 } from '@angular/core';
import { InputValidationService } from '../services/input-validation.service';
import { Subscription } from 'rxjs';

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
  @Input('ValidationError') field!: string;






  constructor() {
    this.subscription = this.validationService.validationError$.subscribe(
      (error) => {
        if (error.status) {
          if (error.field === this.field) {
            this.applyStylingClass();
          }
        } else {
          this.hideMessage();
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
