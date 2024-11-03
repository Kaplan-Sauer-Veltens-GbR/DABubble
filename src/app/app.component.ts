import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatWindowComponent } from "./main/chat-window/chat-window.component";
import { PlaygroundComponent } from "./playground/playground.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatWindowComponent, PlaygroundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
