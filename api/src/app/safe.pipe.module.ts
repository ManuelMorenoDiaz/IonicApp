import { NgModule } from '@angular/core';
import { SafePipe } from 'src/app/safe.pipe';

@NgModule({
  declarations: [SafePipe],
  exports: [SafePipe]
})
export class SafePipeModule { }
