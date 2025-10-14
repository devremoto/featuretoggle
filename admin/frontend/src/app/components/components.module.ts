import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { PageTitleComponent } from './page-title/page-title.component';
import { DialogComponent } from './dialog/dialog.component';
import { DialogService } from './dialog/dialog.service';

import { BreadcrumbsComponent } from './breadcrumb/breadcrumb.component';
import { TreeViewComponent } from './tree-view/tree-view.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatePicker } from './forms/date-picker/date-picker';
import { NgbAlertModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        NgbDatepickerModule,
        NgbAlertModule,
        PageTitleComponent,
        DialogComponent,
        BreadcrumbsComponent,
        TreeViewComponent,
        DatePicker
    ],
    exports: [
        PageTitleComponent,
        DialogComponent,
        BreadcrumbsComponent,
        TreeViewComponent,
        DatePicker
    ],
    providers: [DialogService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
