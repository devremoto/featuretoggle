import { Inject, Injectable } from '@angular/core';
import { ISocketService, SocketService } from './ISocketService';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { baseApiAddress } from '../config';

@Injectable({
    providedIn: 'root'
})
export class SocketClientService extends SocketService implements ISocketService {
    socket!: Socket;
    constructor() {
        super();
    }
    connect(): void {
        this.socket = io(baseApiAddress, {
            withCredentials: true,
            transports: ['websocket', 'polling'], // Allow fallback
            autoConnect: true,
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 5,
            timeout: 20000,
            // v2.x compatibility options
            forceNew: false,
            multiplex: true,
            upgrade: true,
            rememberUpgrade: false
        });
        this.socket.connect();
        this.listeners(); // Call the base class listeners method
    }



    on(event: string): Observable<any> {
        return new Observable(observer => {
            this.socket.on(event, (data: any) => {
                console.log(`Event: ${event}`, JSON.stringify(data, null, 2));
                observer.next(data);
            });
        });
    }

    emit(event: string, data: any): void {
        this.socket.emit(event, data);
    }
}