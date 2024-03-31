import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Factura } from '../../../interfaces/index';

import Cookies from 'js-cookie';

@Component({
  selector: 'app-crear-factura-modal',
  templateUrl: './crear-factura-modal.page.html',
  styleUrls: ['./crear-factura-modal.page.scss'],
})
export class CrearFacturaModalPage {
  formulario: FormGroup;
  factura: Factura;

  constructor(private modalController: ModalController, private apiService: ApiService) {
    const id_usuario = Number(Cookies.get('id_usu'));

    // Inicializa 'usuario' con un objeto que cumple con la interfaz Usuario
    this.factura = {
      id_usuario:id_usuario,
      monto: '',
      fecha_vencimiento: '',
      descripcion: '',
      pagada: 0,
      nombre_usuario: ''
    };

    // Inicializa 'formulario' con un nuevo FormGroup
    this.formulario = new FormGroup({
      id_usuario: new FormControl(this.factura.id_usuario),
      monto: new FormControl(this.factura.monto),
      pagada: new FormControl(this.factura.pagada),
      fecha_vencimiento: new FormControl(this.factura.fecha_vencimiento),
      descripcion: new FormControl(this.factura.descripcion)
    });
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  guardarCambios() {
    const nuevaFactura: Factura = {
      ...this.formulario.value,
    };

    this.apiService.insertarFactura(nuevaFactura).subscribe(response => {
      console.log(response.message);
      this.cerrarModal();
    });

    console.log(this.formulario.value);
  }

}
