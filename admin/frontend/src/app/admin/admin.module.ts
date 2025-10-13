import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/interceptor';
import { AdminLayoutModule } from './_layout/admin-layout.module';
import { DirectivesModule } from '../directives/directives.module';
import { ComponentsModule } from '../components/components.module';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        DirectivesModule,
        AdminLayoutModule,
        AdminRoutingModule,
        ComponentsModule,
        RouterModule
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
    declarations: [],
    exports: [AdminLayoutModule, DirectivesModule, ComponentsModule]
})
export class AdminModule {
    constructor() {

    }
}



