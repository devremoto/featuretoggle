// models imports/////////////////////////////////
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './AuthService';
import { CanActivateViaAuthGuard, } from './CanActivateViaAuthGuard';
import { LoginCallBackComponent } from './callback';
import { AuthInterceptor } from './interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccountService } from './account.service';
import 'rxjs/operators/tap';
import { UnauthorizedComponent } from './unauthorized.component';

@NgModule({
  imports: [
    RouterModule.forChild([

      { path: 'callback', component: LoginCallBackComponent },
      { path: 'unauthorized/:id', component: UnauthorizedComponent },

    ])
  ],
  providers: [
    AuthService,
    CanActivateViaAuthGuard,
    AccountService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  declarations: [LoginCallBackComponent, UnauthorizedComponent],
  exports: [LoginCallBackComponent]
})

export class AuthModule {

}

