import { Directive, ElementRef, inject, Input, Renderer2 } from '@angular/core';
import { InputValidationService } from '../services/input-validation.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[ValidationError]',
  standalone: true
})
export class ValidationErrorDirective {
 // will add a tooltip how password should look like etc
 private subscription: Subscription;
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private validationService = inject(InputValidationService)
 


  constructor() {
    this.subscription = this.validationService.validationError$.subscribe(error => {
      if(error.status) {

      }
    })
   }


ngOnChanges(): void {
if(this.ValidationError) {
  this.applyStylingClass();

}else {
this.hideMessage();
}
}


 applyStylingClass() {
  this.renderer.addClass(this.el.nativeElement,'error-message')
 }

 hideMessage() {
  this.renderer.addClass(this.el.nativeElement,'d-none')
 }
}
