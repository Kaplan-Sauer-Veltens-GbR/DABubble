import { Component, inject } from '@angular/core';
import { IconLibaryComponent } from '../../shared/components/icon-component/icon-libary.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../shared/components/inputs/button/button.component';
import { InputFieldsComponent } from '../../shared/components/inputs/input-fields/input-fields.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { InputValidationService } from '../../services/input-validation.service';

@Component({
  selector: 'app-avatar-picker',
  standalone: true,
  imports: [IconLibaryComponent,CommonModule,ButtonComponent,RouterModule],
  templateUrl: './avatar-picker.component.html',
  styleUrl: './avatar-picker.component.scss'
})
export class AvatarPickerComponent {
public authService = inject(AuthService);
public inputChecker = inject(InputValidationService);
email:string = this.inputChecker.email;
password:string = this.inputChecker.password;
name:string = this.inputChecker.name;
profilePicture:string = this.inputChecker.profilePicture;
avatarImages: string[] = [
  'assets/images/avatars/avatar1.png',
  'assets/images/avatars/avatar2.png',
  'assets/images/avatars/avatar3.png',
  'assets/images/avatars/avatar4.png',
  'assets/images/avatars/avatar5.png'
];

setPhotoPath(path:string) {
  this.profilePicture = path;
  
  
}

ngOnInit(): void {


  
}
}
