import { ToastrService } from 'ngx-toastr';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [

    ],
    providers: [
        NgbAlertConfig,
        ToastrService,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        CommonModule
    ],

})
export class LibModule {

}
