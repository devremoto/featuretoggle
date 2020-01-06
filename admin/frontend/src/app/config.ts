import { Injectable } from '@angular/core';

export class Host {
  port: string;
  name: string;
  protocol: string;
  constructor() {
    if (typeof window !== 'undefined') {
      this.name = window.location.hostname;
      this.port = window.location.port;
      this.protocol = window.location.protocol;
    } else {
      this.name = '127.0.0.1';
      this.port = '';
      this.protocol = 'http';
    }
  }

  get isLocal() {
    return this.name === 'localhost';
  }
  get location(): string {
    const url =
      `${this.protocol}//${this.name}` + (this.port ? `:${this.port}` : '');
    return url;
  }
}
export let baseApiAddress = 'http://localhost:5050';

@Injectable()
export class Config {
  siteTile = `FEATURE TOGGLE`;
  host: Host = new Host();

  useAuthorityServer = true;
  siteUrl: string = this.host.isLocal
    ? this.host.location
    : 'http://localhost:5000';
  apiAddress: string = this.host.isLocal
    ? `${baseApiAddress}/featuretoggle/v1/`
    : 'http://localhost:5050/featuretoggle/v1/';
  authorityAddress: string = this.host.isLocal
    ? 'http://localhost:5000'
    : 'http://localhost:5000';

  iss: string = this.authorityAddress;
  server: string = this.authorityAddress;
  redirect_url: string = this.siteUrl + '/callback';
  jwks_url: string =
    this.authorityAddress + '/.well-known/openid-configuration/jwks';
  client_id = 'feature_toggle_admin';
  response_type = 'id_token token';
  scope = 'openid profile offline_access roles feature_toggle_api';
  post_logout_redirect_uri: string = this.siteUrl + '/callback';
  silent_redirect_uri: string = this.siteUrl + '/callback?renew=true';
  allowSilentRenew = true;
}
