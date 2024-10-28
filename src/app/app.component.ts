import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatWindowComponent } from "./main/chat-window/chat-window.component";
import { HeaderComponent } from "./main/header/header.component";
import { SidebarComponent } from "./main/sidebar/sidebar.component";
import { AddPeopleComponent } from "./shared/components/chat/add-people/add-people.component";
import { WorkspaceService } from './services/workspace.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatWindowComponent, HeaderComponent, SidebarComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public workspace = inject(WorkspaceService)
}