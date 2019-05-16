import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private socket: Socket) {}

  onUpdate() {
    return this.socket.fromEvent('update').pipe(map(data => data));
  }

  onList() {
    return this.socket.fromEvent('list').pipe(map(data => data));
  }

  on(event: string) {
    return this.socket.fromEvent(event).pipe(
      map(data => {
        console.log(event);
        console.log(data);
        return data;
      })
    );
  }
  emit(event: string, obj: any) {
    this.socket.emit(event, obj);
  }
}
