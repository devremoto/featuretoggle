import { Injectable } from '@angular/core';
import { SocketService } from './ISocketService';
import { Observable } from 'rxjs';
import { FeatureToggle } from '../models/FeatureToggle';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private socketService: SocketService) {
    this.init();

  }
  // safely handles circular references
  safeStringify(obj: any, indent = 2) {
    let cache: any[] | null = [];
    const retVal = JSON.stringify(
      obj,
      (key, value) =>
        typeof value === "object" && value !== null
          ? cache!.includes(value)
            ? undefined // Duplicate reference found, discard key
            : cache!.push(value) && value // Store value in our collection
          : value,
      indent
    );
    cache = null;
    return retVal;
  }
  init() {

    this.socketService.connect();

    this.listeners();
  }

  on(event: string): Observable<any> {
    return this.socketService.on(event);
  }

  emit(event: string, data: any) {
    this.socketService.emit(event, data);
  }

  listeners() {
    this.socketService.on('list').subscribe(result => {
      console.log(result);
    });
    this.socketService.on('update').subscribe(result => {
      console.log(result);
    });
    this.socketService.on('connection').subscribe(result => {
      console.log(result);
    });
  }




}
