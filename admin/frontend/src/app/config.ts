import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export class Host {
  port: string;
  name: string;
  protocol: string;
  constructor() {
    this.name = environment.HOST;
    this.port = window.location.port;
    this.protocol = window.location.protocol;
  }
}
export let baseApiAddress = `${environment.HOST}:${environment.MS_MONGO_PORT}`;

@Injectable({ providedIn: 'root' })
export class Config {
  siteTile = `FEATURE TOGGLE`;
  host: Host = new Host();

  useAuthorityServer = environment.USE_AUTHORITY_SERVER;
  siteUrl = `${environment.HOST}:${environment.FRONT_PORT}`;
  apiAddress = `${baseApiAddress}/`;
  authorityAddress = `${environment.STS_SERVER}`;

  iss: string = this.authorityAddress;
  server: string = this.authorityAddress;
  redirect_url: string = this.siteUrl + '/callback';
  jwks_url: string =
    this.authorityAddress + '/.well-known/openid-configuration/jwks';
  client_id = environment.CLIENT_ID;
  response_type = 'id_token token';
  scope = 'openid profile offline_access roles feature_toggle_api';
  post_logout_redirect_uri: string = this.siteUrl + '/callback';
  silent_redirect_uri: string = this.siteUrl + '/callback?renew=true';
  allowSilentRenew = true;
}
