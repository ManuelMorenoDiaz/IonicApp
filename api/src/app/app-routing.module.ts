import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service'; // importar tu servicio de guardia de ruta

const routes: Routes = [
  {
    path: 'principal',
    redirectTo: 'principal',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuardService]
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
    path: '',
    loadChildren: () => import('./pages/principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'facturas-recordatorios-pagos',
    loadChildren: () => import('./pages/facturas-recordatorios-pagos/facturas-recordatorios-pagos.module').then( m => m.FacturasRecordatoriosPagosPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'ahorros-inversiones',
    loadChildren: () => import('./pages/ahorros-inversiones/ahorros-inversiones.module').then( m => m.AhorrosInversionesPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'informes-analisis',
    loadChildren: () => import('./pages/informes-analisis/informes-analisis.module').then( m => m.InformesAnalisisPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'consejos',
    loadChildren: () => import('./pages/consejos/consejos.module').then( m => m.ConsejosPageModule),
    canActivate: [AuthGuardService]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
