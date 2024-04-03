import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CrearAhorroInversionModalPage } from './crear-ahorros-inversiones-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  declarations: [CrearAhorroInversionModalPage]
})
export class CrearAhorroInversionModalPageModule { }
