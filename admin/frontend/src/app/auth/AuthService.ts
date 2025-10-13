import { Injectable, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from '../config';
import { SessionStorageService } from '../shared/util/session-storage.service';
import { UserManager, User, WebStorageStateStore } from 'oidc-client';

@Injectable({ providedIn: 'root' })
export class AuthService {


  private _sessionStorage: any;
  private _localStorage: any;

  token: string | null = null;
  id_token: string | null = null;
  callbackUrl: string | null = null;
  onLogin: EventEmitter<User> = new EventEmitter();
  onLogout: EventEmitter<string> = new EventEmitter();
  userManager: UserManager;
  user: User|null = null;
  logoutUrl: string | null = null;
  constructor(
    @Inject(Router) private _router: Router,
    @Inject(SessionStorageService) private _storage: SessionStorageService,
    @Inject(Config) private _config: Config
  ) {
    this._localStorage = this._storage.localStorage;
    this._sessionStorage = this._storage.sessionStorage;
    this.userManager = new UserManager({
      authority: this._config.authorityAddress,
      client_id: this._config.client_id,
      redirect_uri: this._config.redirect_url,
      scope: this._config.scope,
      response_type: this._config.response_type,
      post_logout_redirect_uri: this._config.post_logout_redirect_uri,
      userStore: new WebStorageStateStore({ store: this._localStorage }),
      automaticSilentRenew: this._config.allowSilentRenew,
      silent_redirect_uri: this._config.silent_redirect_uri
    });
    // Log.logger = console;
    this.getUser();

    this.userManager.events.addUserLoaded(((user: User) => {
      this.user = user;
    }));
  }

  isLoggedIn(): boolean {
    return !!(this.user && this.user.access_token && !this.user.expired);
  }

  getToken(): string | null {
    return this.user?.access_token || null;
  }

  getIdToken(): string | null {
    return this.user?.id_token || null;
  }

  async getUser() {
    this.user = await this.userManager.getUser();
  }

  public login() {
    this.userManager.signinRedirect();
  }

  navigateTo(segment: string, params?: any) {
    this._router.navigate([segment, params]);
  }

  navigateToUrl(url: string) {
    this._router.navigateByUrl(url);
  }

  callBackLogin() {
    this.userManager.signinRedirectCallback().then(
      (user) => {
        this.user = user;
        this.onLogin.emit(user);
        const url = this.getCallbackUrl();
        this._router.navigate([url]);
      },
      () => {
      }
    );
    return;
  }

  public logout(url?: any) {
    if (url) {
      this.setLogoutUrl(url);
    }
    this.clearToken();
  }

  public fullLogout(url?: any) {
    this.logout(url);
    this.userManager.signoutRedirect();
  }

  callBackLogout(): any {
    this.userManager.signoutRedirectCallback().then(() => {
      const url = this.getLogoutUrl() || 'home';
      this.onLogout.emit(url);
      this._router.navigate([url]);
      this.clearLogoutUrl();
    });
  }

  callBackRenew(): any {
    this.userManager.signinSilentCallback()
      .catch((error) => {
        console.log(error);
      });
  }

  private clearToken() {
    this._localStorage.removeItem('token');
    this._localStorage.removeItem('id_token');
    this._sessionStorage.removeItem('userData');
    this.id_token = null;
    this.token = null;
  }

  public setCallbackUrl(url: string) {
    this.callbackUrl = url;
    this._sessionStorage.setItem('callback_url', url);
  }

  public getCallbackUrl() {
    const url = this._sessionStorage.getItem('callback_url');
    return url;
  }

  public clearCallbackUrl() {
    this._sessionStorage.removeItem('callback_url');
  }

  public setLogoutUrl(url:string) {
    this.logoutUrl = url;
    this._sessionStorage.setItem('logout_url', url);
  }

  public getLogoutUrl() {
    const url = this._sessionStorage.getItem('logout_url');
    return url;
  }

  public clearLogoutUrl() {
    this._sessionStorage.removeItem('logout_url');
  }
}
