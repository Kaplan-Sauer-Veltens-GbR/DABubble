import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { RadioButtonComponent } from "./shared/components/inputs/radio-button/radio-button.component";
import { WorkspaceFabComponent } from "./main/workspace-menu/workspace-fab/workspace-fab.component";
import { AuthService } from './services/auth.service';
import { InputFieldsComponent } from './shared/components/inputs/input-fields/input-fields.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslocoModule, RadioButtonComponent, WorkspaceFabComponent,InputFieldsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  auth: AuthService = inject(AuthService);

  ngOnInit(): void {
 
    
  }
  
}