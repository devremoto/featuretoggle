import 'hammerjs';
import { enableProdMode, importProvidersFrom } from '@angular/core';

import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { SocketService } from './app/services/ISocketService';
import { NgxSocketService } from './app/services/NgxSocketService';
import { SocketClientService } from './app/services/SocketClientService';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthModule } from './app/auth/auth.module';
import { ComponentsModule } from './app/components/components.module';
import { AppRoutingModule } from './app/app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { baseApiAddress } from './app/config';
import { AppComponent } from './app/app.component';

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



if (environment.production) {
  enableProdMode();

  console.log = function () { };
  console.debug = function () { };
  console.info = function () { };
  console.warn = function () { };
  // Keep console.error for critical issues
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      CommonModule,
      FormsModule,
      NgbDatepickerModule,
      BrowserModule,
      AuthModule,
      ComponentsModule,
      AppRoutingModule,
      ToastrModule.forRoot(),
      SocketIoModule.forRoot(socketConfig)),
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: SocketService,
      useClass: environment.useNgxSocket ? NgxSocketService : SocketClientService
    },
    provideAnimations()
  ]
})
  .catch(err => console.log(err));



