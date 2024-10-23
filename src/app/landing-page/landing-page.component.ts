import { Component } from '@angular/core';
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { AvatarPickerComponent } from "./avatar-picker/avatar-picker.component";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [SignInComponent, SignUpComponent, AvatarPickerComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
