import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { IndexComponent } from './index/index.component';
import { LibModule } from '../../shared/libModule.module';

@NgModule({
    imports: [
        SharedModule,
        LibModule
    ],
    declarations: [
        IndexComponent
    ],
    exports: [
        SharedModule,
        IndexComponent
    ]
})
export class AdminLayoutModule {

}


