import { Routes } from '@angular/router';
import { PlaygroundComponent } from './playground/playground.component';
import { ChatWindowComponent } from './main/chat-window/chat-window.component';
import { SignInComponent } from './landing-page/sign-in/sign-in.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
  { path: 'playground', component: PlaygroundComponent },
  { path: '', component: LandingPageComponent },
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: 'user/:uid',
        component: ChatWindowComponent,
        
      },
    ],
  },
];
