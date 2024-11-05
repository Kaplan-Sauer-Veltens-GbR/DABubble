import { Component, Input, ViewChild } from '@angular/core';
import { IconLibaryComponent } from "../../icon-component/icon-libary.component";
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text-message-field',
  standalone: true,
  imports: [IconLibaryComponent,CommonModule,FormsModule],
  templateUrl: './text-message-field.component.html',
  styleUrl: './text-message-field.component.scss'
})
export class TextMessageFieldComponent {
  @Input() placeholder:string = 'Enter';
  @Input() pattern:string = '';
  @Input() required: boolean = false;
  message: string = '';
  @ViewChild('myForm') myForm!: NgForm;

  submitForm(form: NgForm ,event:Event) {
    if (this.myForm.valid) {
      event.preventDefault()
      this.onSubmit(form);
    }
  }
  
  onSubmit(form: NgForm) {
    console.log('Formu send:', form.value.message);
    form.reset(); 
  }
}
  

