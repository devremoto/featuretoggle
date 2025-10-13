import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateViaAuthGuard } from '../../auth/CanActivateViaAuthGuard';
import { FeatureToggleComponent } from './feature-toggle/feature-toggle.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: '', redirectTo: 'feature-toggle', pathMatch: 'full' },
  {
    path: 'feature-toggle',
    data: { title: 'Feature Toggle' },
    component: FeatureToggleComponent,
    canActivate: [CanActivateViaAuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, NgbDatepickerModule]
})
export class AdminPagesRoutingModule { }
