import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LibModule } from '../shared/libModule.module';
import { SharedModule } from '../shared/shared.module';
import { AuthInterceptor } from '../auth/interceptor';
import { AdminLayoutModule } from './_layout/admin-layout.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        LibModule,
        AdminLayoutModule,
        AdminRoutingModule,
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
    declarations: [],
})
export class AdminModule {
    constructor() {

    }
}



