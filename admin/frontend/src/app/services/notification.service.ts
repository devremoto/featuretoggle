import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private socket: Socket) { }

  onUpdate() {
    return this.socket.fromEvent<any>('update').pipe(
      map((data) => {
        return data;
      })
    );
  }

  onList() {
    return this.socket.fromEvent('list').pipe(
      map((data) => {
        return data;
      })
    );
  }

  on(event: string) {
    return this.socket.fromEvent(event).pipe(
      map((data) => {
        return data;
      })
    );
  }
  emit(event: string, obj: any) {
    this.socket.emit(event, obj);
  }
}
