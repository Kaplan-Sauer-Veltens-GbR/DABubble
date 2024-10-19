import { Component } from '@angular/core';
import { SignInComponent } from "./sign-in/sign-in.component";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [SignInComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
