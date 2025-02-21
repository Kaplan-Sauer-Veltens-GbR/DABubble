import { Component, EventEmitter, inject, Input, Output, output, ViewChild } from '@angular/core';
import { IconLibaryComponent } from "../../icon-component/icon-libary.component";
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DbService } from '../../../../services/db.service';
import { collection } from '@angular/fire/firestore';
import { DbStorageService } from '../../../../services/db-storage.service';

@Component({
  selector: 'app-text-message-field',
  standalone: true,
  imports: [IconLibaryComponent,CommonModule,FormsModule],
  templateUrl: './text-message-field.component.html',
  styleUrl: './text-message-field.component.scss'
})
export class TextMessageFieldComponent {
  public dbStorage = inject(DbStorageService)
  @Input() placeholder:string = 'Enter';
  @Input() pattern:string = '';
  @Input() required: boolean = false;
  @Input() toggleEmojiPicker!:boolean;
  @Output() istoggleChange = new EventEmitter<boolean>();
 
  @Output() messageSend = new EventEmitter<string>();
  message: string = '';
  selectedFile: File | null = null;
  @ViewChild('myForm') myForm!: NgForm;
  
  private dbService = inject(DbService)
  submitForm(form: NgForm ,event:Event) {
    if (this.dbStorage.isUploading) {
      console.log('Upload läuft, Enter-Taste blockiert.');
      event.preventDefault(); // Verhindert den Standard-Submit
      event.stopPropagation(); // Stoppt die Event-Ausbreitung
    }
    else if(this.myForm.valid) {
      event.preventDefault()
      this.onSubmit(form);
    }
  }
  


  

  triggerFileInput(): void {  
    const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
    if (fileInput) {
      fileInput.click(); 
      
    }
    
  }

  emojiPickerToggle() {
    console.log('clicked');
    
    this.toggleEmojiPicker = !this.toggleEmojiPicker;
    this.istoggleChange.emit(this.toggleEmojiPicker);
  }
 

  async onSubmit(form: NgForm) {
   
    console.log('Formu send:', form.value.message);
    // form.value.message = this.message;
 
    if(this.dbStorage.selectedFile ) {
     this.dbStorage.imgDownloadUrl = await  this.dbStorage.uploadFile(this.dbStorage.selectedFile,'chatMessageImg/')
    }
    this.messageSend.emit(this.message);
    form.reset(); 
    this.dbStorage.imgDownloadUrl = '';
    this.message = '';
  }

  addEmoji(emoji: string) {
    this.message += emoji;  // Emoji zur Nachricht hinzufügen
  }
 
}
  

