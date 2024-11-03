import { Component ,OnInit} from '@angular/core';
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { AvatarPickerComponent } from "./avatar-picker/avatar-picker.component";
import { ResetPasswordEmailComponent } from "./reset-password-email/reset-password-email.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { IconLibaryComponent } from "../shared/components/icon-component/icon-libary.component";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [SignInComponent, SignUpComponent, AvatarPickerComponent, ResetPasswordEmailComponent, ResetPasswordComponent, IconLibaryComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {
  showAnimation = true;

  ngOnInit() {

  }
}
