import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { ComponentsModule } from './components/components.module';
import { baseApiAddress } from './config';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { SocketClientService } from './services/SocketClientService';
import { SocketService } from './services/ISocketService';
import { NgxSocketService } from './services/NgxSocketService';
import { environment } from 'src/environments/environment';
const socketConfig: SocketIoConfig = {
  url: baseApiAddress, // Use HTTP URL directly, not WebSocket
  options: {
    transports: ['websocket', 'polling'], // Allow fallback to polling
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
  }
};
@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgbDatepickerModule,
    BrowserModule,
    BrowserAnimationsModule,
    AuthModule,
    ComponentsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    SocketIoModule.forRoot(socketConfig)
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: SocketService, useClass: environment.useNgxSocket ? NgxSocketService : SocketClientService }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  //#region Constructor
  constructor() { }
  //#endregion Constructor
}