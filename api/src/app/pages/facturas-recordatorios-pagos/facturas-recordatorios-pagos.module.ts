import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacturasRecordatoriosPagosPageRoutingModule } from './facturas-recordatorios-pagos-routing.module';

import { FacturasRecordatoriosPagosPage } from './facturas-recordatorios-pagos.page';

import { NavburModule } from '../navbur/navbur.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacturasRecordatoriosPagosPageRoutingModule,
    NavburModule
  ],
  declarations: [FacturasRecordatoriosPagosPage]
})
export class FacturasRecordatoriosPagosPageModule {}
