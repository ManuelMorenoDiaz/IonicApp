import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformesAnalisisPageRoutingModule } from './informes-analisis-routing.module';

import { InformesAnalisisPage } from './informes-analisis.page';

import { NavburModule } from '../navbur/navbur.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformesAnalisisPageRoutingModule,
    NavburModule
  ],
  declarations: [InformesAnalisisPage]
})
export class InformesAnalisisPageModule {}
