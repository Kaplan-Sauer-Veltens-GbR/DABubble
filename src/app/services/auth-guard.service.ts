// import { inject, Injectable } from '@angular/core';
// import { AuthService } from './auth.service';
// import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
// import { map, Observable, take } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuardService implements CanActivate {
// private authService = inject(AuthService)
// private router = inject(Router)
//   constructor() { }

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
//     debugger
//     const routeUid = route.paramMap.get('uid'); // Get 'uid' from the route

//     return this.authService.getAuthState().pipe(
      
//       take(1),  // Ensure we only take the first value
//       map((user) => {
//         console.log('User:', user);
//         console.log('Route UID:', routeUid);
//         if (user && user.uid === routeUid) {
//           // If user is logged in and UID matches, allow access
//           return true;
//         } else {
//           // If not, redirect to the homepage or login
//           this.router.navigate(['']);
//           return false;
//         }
//       })
//     );
//   }
// }
