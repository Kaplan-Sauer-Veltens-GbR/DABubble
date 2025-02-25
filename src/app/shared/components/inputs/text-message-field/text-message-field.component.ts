import { ChangeDetectorRef, Component, EventEmitter, Inject, inject, Input, NgZone, Output, output, ViewChild } from '@angular/core';
import { IconLibaryComponent } from "../../icon-component/icon-libary.component";
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DbService } from '../../../../services/db.service';
import { collection } from '@angular/fire/firestore';
import { DbStorageService } from '../../../../services/db-storage.service';
import { EmojiPickerService } from '../../../../services/emoji-picker.service';

@Component({
  selector: 'app-text-message-field',
  standalone: true,
  imports: [IconLibaryComponent,CommonModule,FormsModule],
  templateUrl: './text-message-field.component.html',
  styleUrl: './text-message-field.component.scss'
})
export class TextMessageFieldComponent {
  public dbStorage = inject(DbStorageService);
  private cdr = inject(ChangeDetectorRef);
  private zone = inject(NgZone);
  @Input() placeholder:string = 'Enter';
  @Input() pattern:string = '';
  @Input() required: boolean = false;
  @Input() toggleEmojiPicker!:boolean;
  @Output() messageSend = new EventEmitter<string>();
  message: string = '';
  imgSend:boolean = true;
  selectedFile: File | null = null;
  uploadProgress!:number;
  isUploading!:boolean;
  showImgPreview = false;
  @ViewChild('myForm') myForm!: NgForm;
  private dbService = inject(DbService)
  private emojiPickerService = inject(EmojiPickerService)
constructor() {
this.dbStorage.isUploading$.subscribe(status => {
  this.zone.run(() => {
    if(status) {
      this.showImgPreview = true;
    }
    this.isUploading = status;
    if(this.isUploading) {
      this.dbStorage.showImgPreview = true;
    }
   
    this.cdr.markForCheck();
  });
})

  this.dbStorage.uploadProgress$.subscribe(progress => {
    this.zone.run(() => {
      this.uploadProgress = progress;
      this.cdr.markForCheck();
    });
  });

}

  submitForm(form: NgForm ,event:Event) {
    if (this.isUploading) {
      event.preventDefault();    
      event.stopPropagation();
    }
    else if(this.myForm.valid) {
      event.preventDefault()
      this.onSubmit(form);
    }
  }
  

  triggerFileInput(): void {  
    const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''
      fileInput.click(); 
      this.imgSend = false;
      
    }
    
  }


  emojiPickerToggle() {
    console.log('clicked');
    this.emojiPickerService.openTextFieldEmojiPicker()
;
  }
 

  async onSubmit(form: NgForm) {
   
    console.log('Formu send:', form.value.message);
    form.value.message = this.message;
    // if(this.dbStorage.selectedFile ) {
    //  this.dbStorage.imgDownloadUrl = await  this.dbStorage.uploadFile(this.dbStorage.selectedFile,'chatMessageImg/')
    // }
    this.messageSend.emit(this.message);
    this.imgSend = true;
    this.dbStorage.showImgPreview = false;
    form.reset(); 
    this.dbStorage.imgDownloadUrl = '';
    this.message = '';
  }
/**
 * Adds the selected emoji to the current message and displays it in the textarea.
 * @param emoji Unicode string of the emoji to be added.
 */
  addEmoji(emoji: string) {
    this.message += emoji;  // Emoji zur Nachricht hinzufügen
   this.emojiPickerService.toggleTextFieldEmojiPicker = false;
  }
 
}
  

