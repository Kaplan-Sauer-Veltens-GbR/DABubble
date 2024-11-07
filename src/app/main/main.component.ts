import { Component, inject } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { WorkspaceService } from '../services/workspace.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent,SidebarComponent,RouterOutlet,CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
public workspace = inject(WorkspaceService)
private router = inject(Router)
private route = inject(ActivatedRoute)

ngOnInit() {

}

}
