import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './_layout/index/index.component';
import { AdminLayoutModule } from './_layout/admin-layout.module';
import { CanActivateViaAuthGuard } from '../auth/CanActivateViaAuthGuard';

const routes: Routes = [
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: 'admin', data: { title: 'Admin' },
    component: IndexComponent,
    canActivate: [CanActivateViaAuthGuard],
    children: [
      { path: '', loadChildren: './adminPages/admin-pages.module#AdminPagesModule', canActivate: [CanActivateViaAuthGuard] },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), AdminLayoutModule],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
