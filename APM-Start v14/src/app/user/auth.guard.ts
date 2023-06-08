import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, CanActivateFn, CanLoad, CanLoadFn, Route, Router, RouterStateSnapshot } from '@angular/router';

export const authCanActivate: CanActivateFn = 
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return checkLoggedIn(state.url);
  }

export const authCanLoad: CanLoadFn = 
  (route: Route): boolean => {
    return checkLoggedIn(route.path || '');
  }

const checkLoggedIn = (url: string): boolean => {
  if (inject(AuthService).isLoggedIn) {
    return true;
  }
  inject(AuthService).redirectUrl = url;
  inject(Router).navigate(['/login']);
  return false;
}

