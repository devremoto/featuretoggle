import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment } from '@angular/router';
import { CanActivateViaAuthGuard } from './auth/CanActivateViaAuthGuard';


const routes: Routes = [
  { path: '', data: { title: 'Home' }, redirectTo: 'admin', pathMatch: 'full' },

  { path: '', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [CanActivateViaAuthGuard] },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
