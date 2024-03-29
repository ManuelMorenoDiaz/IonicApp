import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';

// Importa el módulo de tu página aquí
import { EditarGastoModalPageModule } from './pages/tab1/editar-gasto-modal/editar-gasto-modal.module';
import { CrearGastoModalPageModule } from './pages/tab1/crear-gasto-modal/crear-gasto-modal.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    EditarGastoModalPageModule,
    CrearGastoModalPageModule

  ],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
