import { ToasterModule, ToasterService } from 'angular2-toaster';
import { NgbModule, NgbAlertConfig, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [

    ],
    providers: [
        NgbAlertConfig,
        ToasterService,
    ],
    imports: [
        CommonModule,
        NgbModule,
        NgbAccordionModule,
        ToasterModule,
    ],
    exports: [
        CommonModule,
        NgbModule,
        ToasterModule,

    ],

})
export class LibModule {

}
