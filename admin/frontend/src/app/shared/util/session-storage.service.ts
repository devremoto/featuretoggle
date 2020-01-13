import { Injectable } from '@angular/core';
declare var require: any;
declare var process: any;

@Injectable()
export class SessionStorageService {


    constructor() { }

    public setObjectCache<TT>(key: string, value: TT) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    public get localStorage() {
        return getLocalStorage();
    }

    public get sessionStorage() {
        return getSessionStorage();
    }

    getLocaltorage(): any {
        return  this.sessionStorage;
    }

    public getObjectCache<TT>(key: string) {
        const result = sessionStorage.getItem(key);
        if (result) {
            return <TT>JSON.parse(result);
        }
    }

    public setCache(key: string, value: any) {
        this.sessionStorage.setItem(key, value);
    }

    public getCache(key: string) {
        return this.sessionStorage.getItem(key);
    }

    public removeCache(key: string) {
        this.sessionStorage.removeItem(key);
    }

    public setLocalCache(key: string, value: any) {
        this.localStorage.setItem(key, value);
    }

    public getLocalCache(key: string) {
        return this.localStorage.getItem(key);
    }

    public removeLocalCache(key: string) {
        this.localStorage.removeItem(key);
    }
}

export function getLocalStorage() {

    // if (process.title != "browser") {
       // var LocalStorage = require('node-localstorage').LocalStorage;

        // return new LocalStorage('./scratch');
    // } else {
        return localStorage;
    // }
}

export function getSessionStorage() {
    // if (process.title != "browser") {
        // return getLocalStorage();
    // } else {
        return sessionStorage;
    // }
}
