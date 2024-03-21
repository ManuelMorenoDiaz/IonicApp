import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsejosPageRoutingModule } from './consejos-routing.module';

import { ConsejosPage } from './consejos.page';

import { NavburModule } from '../navbur/navbur.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsejosPageRoutingModule,
    NavburModule
  ],
  declarations: [ConsejosPage]
})
export class ConsejosPageModule {}
