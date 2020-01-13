import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPagesRoutingModule } from './admin-pages-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LibModule } from '../../shared/libModule.module';
import { FeatureToggleComponent } from './feature-toggle/feature-toggle.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTreeModule } from '@angular/material/tree';
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
