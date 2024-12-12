import { Component, inject } from '@angular/core';
import { IconLibaryComponent } from '../../shared/components/icon-component/icon-libary.component';
import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../shared/components/inputs/button/button.component';
// import { InputFieldsComponent } from '../../shared/components/inputs/input-fields/input-fields.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { InputValidationService } from '../../services/input-validation.service';
import { PopupNotificationComponent } from '../../shared/components/popup-notification/popup-notification.component';
import { DbStorageService } from '../../services/db-storage.service';

@Component({
  selector: 'app-avatar-picker',
  standalone: true,
  imports: [
    IconLibaryComponent,
    CommonModule,
    ButtonComponent,
    RouterModule,
    PopupNotificationComponent,
  ],
  templateUrl: './avatar-picker.component.html',
  styleUrl: './avatar-picker.component.scss',
})
export class AvatarPickerComponent {
  public authService = inject(AuthService);
  public inputChecker = inject(InputValidationService);
  public storageService = inject(DbStorageService)
  email: string = this.inputChecker.email;
  password: string = this.inputChecker.password;
  name: string = this.inputChecker.name;
  profilePicture: string = 'assets/images/avatars/avatar-picker-unset.png';
  previousImgPath: string |null = ''
  avatarImages: string[] = [
    'assets/images/avatars/avatar1.png',
    'assets/images/avatars/avatar2.png',
    'assets/images/avatars/avatar3.png',
    'assets/images/avatars/avatar4.png',
    'assets/images/avatars/avatar5.png',
  ];
  selectedFile: File | null = null;
  showPopup: boolean = false;
  popupMessage: string = '';

  setPhotoPath(path: string) {
    this.profilePicture = path;
    console.log(this.profilePicture);
    
  }

  ngOnInit(): void {}

  async onSubmit() {
    const result = await this.authService.createUserWithEmailAndPassword(
      this.email,
      this.password,
      this.name,
      this.profilePicture
    );
    this.popupMessage = result.message;
    this.showPopup = true;
    console.log(this.profilePicture);
  }

  async uploadFile() {
    debugger
    this.storageService.checkPreviousImgPath(this.previousImgPath);
    if (this.selectedFile) {
      try {
        this.profilePicture = await this.storageService.uploadFile(this.selectedFile);
        this.previousImgPath = this.profilePicture
        console.log('Profilbild-URL:', this.profilePicture);
      } catch (error) {
        console.error('Fehler beim Hochladen des Bildes:', error);
      }
    } else {
      console.warn('Keine Datei ausgewählt.');
    }
  }

  onFileSelected(event:any):void {
    if(event.target.files.length > 0) {
     this.selectedFile = event.target.files[0];
     this.uploadFile();
    }
     }
}
