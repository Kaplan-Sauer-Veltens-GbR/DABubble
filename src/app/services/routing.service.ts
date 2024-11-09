import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  private router = inject(Router)
  constructor() { }


  routeWithId(uId:string) {
   
    this.router.navigate(['main/user',uId]) // add to ow nservice so i can use auth methodes on it tomorrow
    }}
  
  

