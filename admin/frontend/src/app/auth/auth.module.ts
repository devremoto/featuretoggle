// models imports/////////////////////////////////
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './AuthService';
import { CanActivateViaAuthGuard, } from './CanActivateViaAuthGuard';
import { LoginCallBackComponent } from './callback';
import { AuthInterceptor } from './interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccountService } from './account.service';
import { UnauthorizedComponent } from './unauthorized.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'callback', component: LoginCallBackComponent },
            { path: 'unauthorized/:id', component: UnauthorizedComponent },
        ]),
        LoginCallBackComponent, UnauthorizedComponent
    ],
    providers: [
        AuthService,
        CanActivateViaAuthGuard,
        AccountService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    exports: [LoginCallBackComponent]
})

export class AuthModule {

}

