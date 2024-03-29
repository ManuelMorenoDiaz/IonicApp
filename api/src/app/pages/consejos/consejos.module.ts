import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsejosPageRoutingModule } from './consejos-routing.module';

import { ConsejosPage } from './consejos.page';

import { NavburModule } from '../navbur/navbur.module';

import { SafePipeModule } from 'src/app/safe.pipe.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsejosPageRoutingModule,
    NavburModule,
    SafePipeModule
  ],
  declarations: [ConsejosPage]
})
export class ConsejosPageModule {}
