import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { WorkspaceService } from '../services/workspace.service';
import { CommonModule } from '@angular/common';
import { Auth, User } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';
import { UserData } from '../interfaces/user-model';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterOutlet, CommonModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public workspace = inject(WorkspaceService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private dbService = inject(DbService);
  user: User | null = null;
  isAuthChecked = false;


  isSmallScreen: boolean = window.innerWidth <= 760;
  showChatWindow: boolean = false;

  ngOnInit(): void {
    this.authService.getAuthState().subscribe((user) => {
      if (user) {
        console.log('User logged in:', user);
        this.user = user;
        this.handleUserLogin(user);
      } else {
        console.log('No user logged in');
        this.user = null;
        this.router.navigate(['']);
      }
    });


    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showChatWindow = event.url.includes('privatmessage');
      }
    });

    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    this.isSmallScreen = window.innerWidth <= 760;
    if (!this.isSmallScreen) {

      this.showChatWindow = false;
    }
  }


  openChat(): void {
    if (this.isSmallScreen) {
      this.showChatWindow = true;
    }
  }


  closeChat(): void {
    if (this.isSmallScreen) {
      this.showChatWindow = false;
    }
  }


  handleUserLogin(user: User) {
    this.getUserIdToken(user).then((idToken) => {
      if (idToken) {
        this.dbService.sessionToken = idToken;
        this.authService.routeWithId(idToken);
        this.getUserData(user.uid);
      }
    });
  }

  async getUserIdToken(user: User) {
    if (user) {
      const idToken = await user.getIdToken();
      return idToken;
    } else {
      console.log('no user logged in');
      return null;
    }
  }

  async getUserData(uid: string) {
    const userData = await this.dbService.getDocData('users', uid);
    console.log(userData, 'Data');
    if (userData) {
      this.dbService.userInformation = userData as UserData;
      console.log(this.dbService.userInformation);
    }
  }
}
