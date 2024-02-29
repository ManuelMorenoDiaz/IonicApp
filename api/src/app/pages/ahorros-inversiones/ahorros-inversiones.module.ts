import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AhorrosInversionesPageRoutingModule } from './ahorros-inversiones-routing.module';

import { AhorrosInversionesPage } from './ahorros-inversiones.page';

import { NavburModule } from '../navbur/navbur.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AhorrosInversionesPageRoutingModule,
    NavburModule
  ],
  declarations: [AhorrosInversionesPage]
})
export class AhorrosInversionesPageModule {}
