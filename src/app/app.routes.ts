import { Routes } from '@angular/router';
import { PlaygroundComponent } from './playground/playground.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MainComponent } from './main/main.component';
import { SignInComponent } from './landing-page/sign-in/sign-in.component';
import { SignUpComponent } from './landing-page/sign-up/sign-up.component';
import { AvatarPickerComponent } from './landing-page/avatar-picker/avatar-picker.component';
import { ResetPasswordEmailComponent } from './landing-page/reset-password-email/reset-password-email.component';
import { ChatWindowComponent } from './main/chat-window/chat-window.component';
import { ResetPasswordComponent } from './landing-page/reset-password/reset-password.component';
export const routes: Routes = [
  { path: 'playground', component: PlaygroundComponent },
  {
    path: '',
    component: LandingPageComponent,
    children: [
      { path: '', component: SignInComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'avatar-picker', component: AvatarPickerComponent },
      { path: 'reset-password-email', component: ResetPasswordEmailComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
    ],
  },
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: 'user/:uid',
        component: ChatWindowComponent,
        
      },
      {
        path: 'privatmessage/:chatId',
        component: ChatWindowComponent
      }
      
    ],
  },
];
