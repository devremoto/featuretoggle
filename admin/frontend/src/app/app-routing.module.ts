import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment } from '@angular/router';
import { CanActivateViaAuthGuard } from './auth/CanActivateViaAuthGuard';
import { AdminLayoutModule } from './admin/_layout/admin-layout.module';

const routes: Routes = [
  { path: '', data: { title: 'Home' }, redirectTo: 'admin', pathMatch: 'full' },

  { path: '', loadChildren: './admin/admin.module#AdminModule', canActivate: [CanActivateViaAuthGuard] },



];

@NgModule({
  imports: [AdminLayoutModule, RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
