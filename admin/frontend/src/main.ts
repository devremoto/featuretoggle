import 'hammerjs';
import { enableProdMode, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';

import { environment } from './environments/environment';

// Register the default locale
registerLocaleData(localeEn, 'en');
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

// Comprehensive Chrome extension error suppression
(function () {
  // Override chrome.runtime if it exists (for extension errors)
  if (typeof (window as any).chrome !== 'undefined' && (window as any).chrome.runtime) {
    const originalSendMessage = (window as any).chrome.runtime.sendMessage;
    (window as any).chrome.runtime.sendMessage = function (...args: any[]) {
      try {
        return originalSendMessage.apply(this, args);
      } catch (error) {
        // Silently catch chrome extension errors
        return;
      }
    };
  }

  // Suppress specific console errors
  const originalConsoleError = console.error;
  console.error = function (...args: any[]) {
    const message = args[0];
    if (typeof message === 'string' &&
      (message.includes('runtime.lastError') ||
        message.includes('message port closed') ||
        message.includes('message channel closed'))) {
      return; // Don't log these errors
    }
    originalConsoleError.apply(console, args);
  };

  // Suppress window errors
  window.addEventListener('error', (event) => {
    const message = event.message || (event.error && event.error.message) || '';
    if (message.includes('runtime.lastError') ||
      message.includes('message port closed') ||
      message.includes('message channel closed') ||
      message.includes('Extension context invalidated')) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }, true);

  // Suppress unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const message = (event.reason && event.reason.message) || event.reason || '';
    if (typeof message === 'string' &&
      (message.includes('runtime.lastError') ||
        message.includes('message port closed') ||
        message.includes('message channel closed'))) {
      event.preventDefault();
      return false;
    }
  });
})();

// Suppress Chrome extension runtime errors
window.addEventListener('error', (event) => {
  if (event.error && event.error.message &&
    (event.error.message.includes('runtime.lastError') ||
      event.error.message.includes('message channel closed') ||
      event.error.message.includes('Extension context invalidated'))) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
});

// Suppress unhandled promise rejections from Chrome extensions
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason && event.reason.message &&
    (event.reason.message.includes('runtime.lastError') ||
      event.reason.message.includes('message channel closed'))) {
    event.preventDefault();
    return false;
  }
});

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
    { provide: LOCALE_ID, useValue: 'en' },
    {
      provide: SocketService,
      useClass: environment.useNgxSocket ? NgxSocketService : SocketClientService
    },
    provideAnimations()
  ]
})
  .catch(err => console.log(err));



