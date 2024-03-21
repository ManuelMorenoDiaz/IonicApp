import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Usuario } from '../../../interfaces/index';

@Component({
  selector: 'app-editar-usuario-modal',
  templateUrl: './editar-usuario-modal.page.html',
  styleUrls: ['./editar-usuario-modal.page.scss'],
})
export class EditarUsuarioModalPage {
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
    const usuarioActualizado: Usuario = {
      ...this.usuario,
      ...this.formulario.value,
    };

    this.apiService.actualizarUsuario(usuarioActualizado).subscribe(response => {
      console.log(response.message);
      this.cerrarModal();
    });

  }
}
