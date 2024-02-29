import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AhorrosInversionesPage } from './ahorros-inversiones.page';

const routes: Routes = [
  {
    path: '',
    component: AhorrosInversionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AhorrosInversionesPageRoutingModule {}
