import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateViaAuthGuard } from '../../auth/CanActivateViaAuthGuard';
import { FeatureToggleComponent } from './feature-toggle/feature-toggle.component';

const routes: Routes = [
    {
      path: 'feature-toggle',
      data: { title: 'Feature Toggle' },
      component: FeatureToggleComponent,
      canActivate: [CanActivateViaAuthGuard]
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminPagesRoutingModule { }
