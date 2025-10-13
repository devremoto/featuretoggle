import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { ISocketService, SocketService } from './ISocketService';

@Injectable({
    providedIn: 'root'
})
export class NgxSocketService extends SocketService implements ISocketService {
    private socket: Socket;

    constructor(socket: Socket) {
        super();
        this.socket = socket;
    }
    connect(): void {
        this.socket.connect();
        this.listeners();
    }

    on(event: string): Observable<any> {
        return this.socket.fromEvent(event).pipe(
            map((data: any) => {
                console.log(`Event: ${event}`, JSON.stringify(data, null, 2));

                return data;
            })
        );
    }

    emit(event: string, data: any): void {
        this.socket.emit(event, data);
    }
}



