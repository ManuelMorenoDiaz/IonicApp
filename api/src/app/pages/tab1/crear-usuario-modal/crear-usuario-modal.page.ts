import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Usuario } from '../../../interfaces/index';

@Component({
  selector: 'app-crear-usuario-modal',
  templateUrl: './crear-usuario-modal.page.html',
  styleUrls: ['./crear-usuario-modal.page.scss'],
})
export class CrearUsuarioModalPage {
  formulario: FormGroup;
  usuario: Usuario;

  constructor(private modalController: ModalController, private apiService: ApiService) {
    // Inicializa 'usuario' con un objeto que cumple con la interfaz Usuario
    this.usuario = {
      nombre: '',
      correo: '',
      contrasena: ''
    };

    // Inicializa 'formulario' con un nuevo FormGroup
    this.formulario = new FormGroup({
      nombre: new FormControl(this.usuario.nombre),
      correo: new FormControl(this.usuario.correo),
      contrasena: new FormControl(this.usuario.contrasena)
    });
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  guardarCambios() {
    const nuevoUsuario: Usuario = {
      ...this.usuario,
      ...this.formulario.value,
    };

    this.apiService.insertarUsuario(nuevoUsuario).subscribe(response => {
      console.log(response.message);
      this.cerrarModal();
    });
  }
}
