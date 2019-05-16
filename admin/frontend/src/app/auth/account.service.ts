import { Injectable } from '@angular/core';
import { AuthService } from './AuthService';

@Injectable({providedIn: 'root'})
export class AccountService {
  constructor(
    private _auth: AuthService) {

  }

  userInfo(): any {
    return this._auth.user.profile;
  }

  logout(returnUrl) {
    this._auth.fullLogout(returnUrl);
  }
}
