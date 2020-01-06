import 'rxjs/operator/do';
import 'rxjs/operator/mergeMap';

import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ComponentsModule } from './components/components.module';
import { baseApiAddress } from './config';
import { LibModule } from './shared/libModule.module';
import { SharedModule } from './shared/shared.module';

const socketConfig: SocketIoConfig = {
  url: baseApiAddress,
  options: {}
};
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    SharedModule,
    LibModule,
    AuthModule,
    ComponentsModule,
    AppRoutingModule,
    NgbModule,
    SocketIoModule.forRoot(socketConfig)
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor() {}
}
