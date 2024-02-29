import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformesAnalisisPage } from './informes-analisis.page';

const routes: Routes = [
  {
    path: '',
    component: InformesAnalisisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformesAnalisisPageRoutingModule {}
