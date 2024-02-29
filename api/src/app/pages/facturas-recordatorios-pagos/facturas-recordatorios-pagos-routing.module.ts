import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacturasRecordatoriosPagosPage } from './facturas-recordatorios-pagos.page';

const routes: Routes = [
  {
    path: '',
    component: FacturasRecordatoriosPagosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacturasRecordatoriosPagosPageRoutingModule {}
