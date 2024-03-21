import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./pages/principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'facturas-recordatorios-pagos',
    loadChildren: () => import('./pages/facturas-recordatorios-pagos/facturas-recordatorios-pagos.module').then( m => m.FacturasRecordatoriosPagosPageModule)
  },
  {
    path: 'ahorros-inversiones',
    loadChildren: () => import('./pages/ahorros-inversiones/ahorros-inversiones.module').then( m => m.AhorrosInversionesPageModule)
  },
  {
    path: 'informes-analisis',
    loadChildren: () => import('./pages/informes-analisis/informes-analisis.module').then( m => m.InformesAnalisisPageModule)
  },
  {
    path: 'consejos',
    loadChildren: () => import('./pages/consejos/consejos.module').then( m => m.ConsejosPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
