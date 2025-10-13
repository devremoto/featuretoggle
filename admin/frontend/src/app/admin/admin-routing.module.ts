import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './_layout/index/index.component';
import { AdminLayoutModule } from './_layout/admin-layout.module';
import { CanActivateViaAuthGuard } from '../auth/CanActivateViaAuthGuard';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: 'admin', data: { title: 'Admin' },
    component: IndexComponent,
    canActivate: [CanActivateViaAuthGuard],
    children: [
      { path: '', loadChildren: () => import('./adminPages/admin-pages.module').then(m => m.AdminPagesModule), canActivate: [CanActivateViaAuthGuard] },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), AdminLayoutModule],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
