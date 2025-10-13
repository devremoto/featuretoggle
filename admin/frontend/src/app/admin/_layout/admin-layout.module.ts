import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IndexComponent } from './index/index.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbDatepickerModule,
        RouterModule
    ],
    declarations: [
        IndexComponent
    ],
    exports: [
        IndexComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminLayoutModule {

}


