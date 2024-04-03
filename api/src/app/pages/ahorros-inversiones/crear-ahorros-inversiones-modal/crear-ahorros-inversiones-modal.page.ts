import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AhorroInversion } from '../../../interfaces/index';
import Cookies from 'js-cookie';

@Component({
  selector: 'app-crear-ahorros-inversiones-modal',
  templateUrl: './crear-ahorros-inversiones-modal.page.html',
  styleUrls: ['./crear-ahorros-inversiones-modal.page.scss'],
})
export class CrearAhorroInversionModalPage {
  categorias: any[] = [];
  formulario: FormGroup;
  ahorroInversion: AhorroInversion;

  constructor(private modalController: ModalController, private apiService: ApiService) {
    const id_usuario = Number(Cookies.get('id_usu'));

    // Inicializa 'usuario' con un objeto que cumple con la interfaz Usuario
    this.ahorroInversion = {
      id_usuario:id_usuario,
      tipo: '',
      monto: '',
      fecha: undefined,
      descripcion: ''
    };

    // Inicializa 'formulario' con un nuevo FormGroup
    this.formulario = new FormGroup({
      id_usuario: new FormControl(this.ahorroInversion.id_usuario),
      tipo: new FormControl(this.ahorroInversion.tipo),
      monto: new FormControl(this.ahorroInversion.monto),
      fecha: new FormControl(this.ahorroInversion.fecha),
      descripcion: new FormControl(this.ahorroInversion.descripcion)
    });
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  guardarCambios() {
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString().split('T')[0];

    const nuevoAhorroInversion: AhorroInversion = {
      ...this.formulario.value,
      fecha: fechaFormateada
    };

    this.apiService.insertarAhorroInversion(nuevoAhorroInversion).subscribe(response => {
      this.cerrarModal();
    });
  }



  ngOnInit() {
  }
}
