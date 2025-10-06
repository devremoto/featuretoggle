import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Config } from '../config';
import { BreadcrumbsComponent } from '../directives/breadcrumb.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';
import { SessionStorageService } from './util/session-storage.service';
import { AuthInterceptor } from '../auth/interceptor';
import { HttpService } from '../services/HttpService';
import { BaseService } from '../services/BaseService';
// import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        BreadcrumbsComponent
    ],
    providers: [
        Config,
        HttpService,
        BaseService,
        SessionStorageService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    imports: [
        CommonModule,
        RouterModule
        // NgbTabsetModule - temporarily disabled due to compatibility issues
    ],
    exports: [
        CommonModule,
        RouterModule,
        // NgbTabsetModule,
        BreadcrumbsComponent
    ],

})
export class SharedModule {

}
