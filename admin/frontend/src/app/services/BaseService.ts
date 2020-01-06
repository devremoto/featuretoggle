import { Injectable } from '@angular/core';
import { HttpService } from './HttpService';
import { Observable, Subject, pipe } from 'rxjs';
import { map, filter, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BaseService<T> {

  protected _controller: string;
  private _emitter: Subject<any>;

  constructor(protected httpService: HttpService) {
    this._emitter = new Subject<any>();
    if (!this._controller) {
      const comp: T = Object.assign({}, <T>{}, {});

      this._controller = (<T>comp).constructor.name;
    }
  }

  getAll(): Observable<T[]> {

    return this.httpService.get(this._controller)
      .pipe(map<any, T[]>((response) => {
        this.emit(this._controller + '-getAll', response);
        return response;
      }));
  }

  getOne(id: any): Observable<T> {

    return this.httpService.get(`${this._controller}/${id}`)
      .pipe(map<any, T>((response) => {
        this.emit(this._controller + '-getOne', response);
        return <T>response;
      }));
  }

  post<TResult>(method: string, params?: any): Observable<TResult> {
    return this.httpService.post(`${this._controller}/${method}`, params)
      .pipe(map<any, TResult>((response) => {
        return response;
      }));
  }

  get<TResult>(method: string, params?: any): Observable<TResult> {
    return this.httpService.get(`${this._controller}/${method}`, params)
      .pipe(map<any, TResult>((response) => {
        return response;
      }));
  }

  save(entity: T, edit?: boolean, inputFiles?: any[]): Observable<T> {
    return this.httpService.save(this._controller, entity, edit)
    .pipe(
      map<any, T>((response) => {
      const obj = response;
      this.emit(this._controller + '-save', obj);
      return obj;
    })

    );

  }

  removeById(id: string) {
    return this.httpService.delete(`${this._controller}/${id}`)
      .pipe(map(() => {
        this.emit(this._controller + '-remove', id);
      }));
  }

  on(key: any): Observable<any> {
    const observer = this._emitter.asObservable();
    return observer.pipe(
      filter(event => {
        return event.key === key || event.key === `${this._controller}-${key}`;
      }))
      .pipe(map(event => {
        if (event.data) {
          return <T>event.data;
        }
        return null;
      }));
  }

  emit(key: any, data?: any) {
    this._emitter.next({ key, data });
  }

  setControler(controller: string): void {
    this._controller = controller;
  }
}
