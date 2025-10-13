import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InRoleDirective } from './inRoleDirective';
import { ReplaceDirective } from './replaceDirective';
import { ClaimDirective } from './claimDirective';
import { ScrollTopDirective } from './scrollTopDirective';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './sidebar.directive';
import { NAV_DROPDOWN_DIRECTIVES } from './nav-dropdown.directive';
import { ProgressCircleDirective } from './progress-circle.directive';
import { AsideToggleDirective } from './aside.directive';
import { NlbrDirective } from './nlbr.directive';
import { EnterDirective } from './enter.directive';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule


  ],
  declarations: [
    EnterDirective,
    InRoleDirective,
    ReplaceDirective,
    ClaimDirective,
    ScrollTopDirective,
    SIDEBAR_TOGGLE_DIRECTIVES,
    NAV_DROPDOWN_DIRECTIVES,
    ProgressCircleDirective,
    AsideToggleDirective,
    NlbrDirective,
  ],
  exports: [
    EnterDirective,
    InRoleDirective,
    ReplaceDirective,
    ClaimDirective,
    ScrollTopDirective,
    SIDEBAR_TOGGLE_DIRECTIVES,
    NAV_DROPDOWN_DIRECTIVES,
    ProgressCircleDirective,
    AsideToggleDirective,
    NlbrDirective,
  ],
})
export class DirectivesModule { }
