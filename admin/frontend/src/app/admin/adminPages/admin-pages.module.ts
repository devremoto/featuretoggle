import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPagesRoutingModule } from './admin-pages-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LibModule } from '../../shared/libModule.module';
import { FeatureToggleComponent } from './feature-toggle/feature-toggle.component';
import {
  MatTreeModule,
  MatIconModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MAT_DATE_LOCALE,
  MatDividerModule
} from '@angular/material';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LibModule,
    MatTreeModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    AdminPagesRoutingModule
  ],
  declarations: [FeatureToggleComponent, MenuComponent],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
  exports: [MenuComponent]
})
export class AdminPagesModule {
  constructor() {}
}
