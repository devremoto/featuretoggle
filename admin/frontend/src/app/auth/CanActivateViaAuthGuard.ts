import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Config } from '../config';
import { AuthService } from './AuthService';
declare var process: any;
@Injectable({ providedIn: 'root' })
export class CanActivateViaAuthGuard implements CanActivate {

    constructor(private authService: AuthService, private _router: Router, private config: Config) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        //console.log(this.config);
        if (!this.config.useAuthorityServer) {
            return true;
        }
        const url = state.url;
        const logged = this.authService.isLoggedIn();
        if (!logged) {
            if (url) {
                this.authService.setCallbackUrl(url);
            }
            this.authService.login();
            return false;
        }
        return logged;
    }
}
