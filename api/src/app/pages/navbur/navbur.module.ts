import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavburComponent } from './navbur.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [NavburComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [NavburComponent]
})
export class NavburModule { }


