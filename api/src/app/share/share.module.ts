import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NavburComponent } from '../pages/navbur/navbur.component';


@NgModule({
  declarations: [
    NavburComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,

  ],
  exports: [NavburComponent]
})
export class ShareModule { }
