
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';


@Injectable({  providedIn: 'root'})
export class HttpService {
  options: any;
  constructor(
    private http: HttpClient,
    private config: Config) {
  }

  prepareUrl(url: any, usePrefix: boolean = true): string {
    if (url.indexOf('://') === -1 && usePrefix) {
      return this.config.apiAddress + url;
    }
    console.log(this.config)
    return url;
  }

  post<T>(url: string, object: any) {
    return this.http.post<T>(this.prepareUrl(url), object);

  }

  save<T>(url: string, object: any, edit: boolean = false) {
    if (edit) {
      return this.update<T>(url, object);
    }

    return this.post<T>(url, object);

  }

  delete<T>(url: string) {
    return this.http.delete<T>(this.prepareUrl(url));
  }

  update<T>(url: string, object: any) {
    return this.http.put<T>(this.prepareUrl(url), object);
  }


  get<T>(url: string, params?: any, usePrefix: boolean = true) {
    return this.http.get<T>(this.prepareUrl(url + (params ? + this.param(params) : ''), usePrefix), this.options);
  }

  param(obj: any) {
    const params = new URLSearchParams();
    for (const key in obj) {
      if (typeof obj[key] !== 'object') {
        params.set(key, obj[key]);
      }
    }
    if (params.toString()) {
      return '?' + params.toString();
    }
    return '';
  }

}
