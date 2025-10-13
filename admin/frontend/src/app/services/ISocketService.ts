import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface ISocketService {
    connect(): void;
    on(event: string): Observable<any>;
    emit(event: string, data: any): void;
}
@Injectable({
    providedIn: 'root'
})
export abstract class SocketService implements ISocketService {
    abstract connect(): void;
    abstract on(event: string): Observable<any>;
    abstract emit(event: string, data: any): void;
    protected listeners() {
        this.on('connect').subscribe((result) => {
            console.log('Connected:', result);
        });
        this.on('disconnect').subscribe((result) => {
            console.log('Disconnected:', result);
        });
        this.on('reconnect').subscribe((result) => {
            console.log('Reconnected:', result);
        });
        this.on('error').subscribe((result) => {
            console.log('Error:', result);
        });
        this.on('connect_error').subscribe((result) => {
            console.log('Connect Error:', JSON.stringify(result));
        });
        this.on('reconnect_attempt').subscribe((result) => {
            console.log('Reconnect Attempt:', JSON.stringify(result));
        });
        this.on('reconnect_failed').subscribe((result) => {
            console.log('Reconnect Failed:', JSON.stringify(result));
        });
        this.on('reconnecting').subscribe((result) => {
            console.log('Reconnecting:', JSON.stringify(result));
        });
    }
}
