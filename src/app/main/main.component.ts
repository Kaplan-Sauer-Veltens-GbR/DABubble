import { Component, ElementRef, inject } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { WorkspaceService } from '../services/workspace.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth, idToken, User } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';
import { UserData } from '../interfaces/user-model';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterOutlet, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  public workspace = inject(WorkspaceService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private dbService = inject(DbService);
  user: User | null = null;
  isAuthChecked = false;

  ngOnInit() {
    this.authService.getAuthState().subscribe((user) => {
      if (user) {
        console.log('User logged in:', user);
        this.user = user;
        this.handleUserLogin(user);
      } else {
        console.log('No user logged in');
        this.user = null;
        this.router.navigate(['']); // working on it later , problem to solve is that the init on reload returns a null user and than it loads a second time with the user data
      }
    });
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
