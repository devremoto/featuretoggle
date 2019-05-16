import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Config } from '../config';
import { BreadcrumbsComponent } from '../directives/breadcrumb.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';
import { SessionStorageService } from './util/session-storage.service';
import { AuthInterceptor } from '../auth/interceptor';
import { HttpService } from '../services/HttpService';
import { BaseService } from '../services/BaseService';

@NgModule({
    declarations: [



        BreadcrumbsComponent,

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
        HttpClientModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        DirectivesModule,
        PipesModule,
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        DirectivesModule,
        PipesModule,
        BreadcrumbsComponent,
    ],

})
export class SharedModule {

}
