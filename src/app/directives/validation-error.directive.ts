import { Directive, ElementRef, inject, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appValidationError]',
  standalone: true
})
export class ValidationErrorDirective {

  constructor() { }
 // will add a tooltip how password should look like etc
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
@Input() errorMessage:boolean = false;

ngOnChanges(): void {
if(this.errorMessage) {
  this.applyStylingClass();

}else {

}
}


 applyStylingClass() {
  this.renderer.addClass(this.el.nativeElement,'error-message')
 }

 hideMessage() {
  this.renderer.addClass(this.el.nativeElement,'d-none')
 }
}
