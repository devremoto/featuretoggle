import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NlbrPipe } from './nlbr.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NlbrPipe],
  exports: [NlbrPipe]
})
export class PipesModule { }
