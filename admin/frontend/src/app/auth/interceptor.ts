import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from './AuthService';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators/tap';
import { Config } from 'src/app/config';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  headers: HttpHeaders;
  constructor(
    private _auth: AuthService,
    private _config: Config
  ) {
    this._auth.onLogout.subscribe(() => {
      this.headers.delete('Authorization');
    });
    console.log(this._config);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = req.clone({
      setHeaders: this.setHeaders(),

    });

    this.setHeader(newReq.headers, 'Content-Type', 'application/json');
    this.setHeader(newReq.headers, 'Origin', this._config.siteUrl);
    this.setHeader(newReq.headers, 'Access-Control-Allow-Origin', '*');

    return next.handle(newReq)
      .pipe(
        tap(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {

            }
          },
          (err: any) => {
            if (err instanceof HttpErrorResponse) {
              console.log(err.error);
              // return err.error
              return this.handleRequest(err);
            }
          }));
  }
  setHeaders() {

    return this.appendToken();
  }

  setHeader(headers: HttpHeaders, key: string, value: string) {
    // if (!headers.filter(x => x.key == value))
    headers.append(key, value);
  }

  appendToken() {
    if (this._auth.isLoggedIn()) {
      return { 'Authorization': `Bearer ${this._auth.getToken()}` };
    }
  }

  handleRequest(error: HttpErrorResponse) {
    if (error.status === 401 || error.status === 403) {
      // this._auth.logout();
      this._auth.navigateToUrl(`/unauthorized/${error.status}`);
      // this._auth.login();
    }

    return error;

  }
}

