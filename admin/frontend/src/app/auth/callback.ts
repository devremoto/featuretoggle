import { Component, OnInit } from '@angular/core';
import { AuthService } from './AuthService';
import { Router } from '@angular/router';
import { LoginModel } from '../models/loginModel';
import { User } from 'oidc-client';

@Component({
  templateUrl: './callback.html',
})
export class LoginCallBackComponent implements OnInit {
  user: User;
  loginModel: LoginModel;
  message: string;

  ngOnInit() {
    const params = this._router.parseUrl(this._router.url).queryParams;

    if (window.location.hash && !params['renew']) {
      this._auth.callBackLogin();
      this.message = 'Logging in';
      return;
    }

    if (params['logoutId']) {
      this._auth.callBackLogout();
      this.message = 'Logging out';
      return;
    }

    if (params['renew']) {
      this._auth.callBackRenew();
      this.message = '';
      return;
    }
  }

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) {
    this._auth.userManager.getUser().then((user => {
      this.user = user;
    }));
  }
}
