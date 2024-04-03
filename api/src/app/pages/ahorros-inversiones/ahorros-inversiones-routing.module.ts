import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorroInversionPage } from './ahorros-inversiones.page';

const routes: Routes = [
  {
    path: '',
    component: AhorroInversionPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AhorroInversionPageRoutingModule {}
