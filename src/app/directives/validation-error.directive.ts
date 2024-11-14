import { Directive, ElementRef, inject, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ValidationError]',
  standalone: true
})
export class ValidationErrorDirective {

  constructor() { }
 // will add a tooltip how password should look like etc
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
@Input() ValidationError:boolean = false;

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
