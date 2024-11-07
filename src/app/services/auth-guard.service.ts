import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
private authService = inject(AuthService)
private router = inject(Router)
  constructor() { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    const isloggedIn = this.authService.checkUserLoggedIn();
    if(isloggedIn) {
      return true;
    }else {
      this.router.navigate(['']);
      return false;
    }
    
  }
}
