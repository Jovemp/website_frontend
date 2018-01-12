import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, 
         RouterStateSnapshot, Route, CanLoad } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let url: string = state.url;

        return this.checkLogin(url);
    }

    canLoad(route: Route): boolean {
        let url = `/${route.path}`;

        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        this.router.navigate(['login']);
        return false;

    }
}