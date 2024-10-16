import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { RadioButtonComponent } from "./shared/components/inputs/radio-button/radio-button.component";
import { WorkspaceFabComponent } from "./main/workspace-menu/workspace-fab/workspace-fab.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslocoModule, RadioButtonComponent, WorkspaceFabComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}