import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PageTitleComponent } from './page-title/page-title.component';
import { LibModule } from '../shared/libModule.module';
import { DialogComponent } from './dialog/dialog.component';
import { DialogService } from './dialog/dialog.service';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
    imports: [
        SharedModule,
        LibModule,
        DirectivesModule
    ],
    declarations: [
        PageTitleComponent,
        DialogComponent
    ],
    exports: [
        PageTitleComponent
    ],
    providers: [DialogService],
    entryComponents: [DialogComponent],
})
export class ComponentsModule { }
