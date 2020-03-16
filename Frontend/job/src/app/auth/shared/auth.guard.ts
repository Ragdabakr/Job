import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../auth.service';
import { NgbPaginationNext } from '@ng-bootstrap/ng-bootstrap';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public auth: AuthService , private router: Router ) {}



  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
  
}
