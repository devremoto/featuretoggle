import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/interceptor';


import { ComponentsModule } from '../components/components.module';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
    CommonModule,
    AdminRoutingModule,
    ComponentsModule,
    RouterModule
],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
    declarations: [],
    exports: [ComponentsModule]
})
export class AdminModule {
    constructor() {

    }
}



