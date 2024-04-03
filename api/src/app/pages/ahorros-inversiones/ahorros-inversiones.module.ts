import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AhorroInversionPage } from './ahorros-inversiones.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import { NavburModule } from '../navbur/navbur.module';

import { AhorroInversionPageRoutingModule } from './ahorros-inversiones-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    AhorroInversionPageRoutingModule,
    NavburModule,
  ],
  declarations: [AhorroInversionPage]
})
export class AhorroInversionPageModule {}
