import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPagesRoutingModule } from './admin-pages-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { FeatureToggleComponent } from './feature-toggle/feature-toggle.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    AdminPagesRoutingModule
  ],
  declarations: [FeatureToggleComponent, MenuComponent],
  providers: [],
  exports: [MenuComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminPagesModule {
  constructor() { }
}
