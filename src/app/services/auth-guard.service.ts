import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';




@Injectable()
export class AuthGuardService implements CanActivate    {

  constructor( private auth:AuthService , private router:Router ) { }
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    console.log()
    if(this.auth.isloggedin() && (this.auth.currentUser.roles=="ROLE_ADMIN" ||  this.auth.currentUser.roles=="branch-admin") )
      return true;
    else{
      this.router.navigate(['/authentication']);
      return false;
    }
  }
}
