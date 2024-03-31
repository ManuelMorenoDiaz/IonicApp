import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Gasto } from '../../../interfaces/index';
import { NavParams } from '@ionic/angular';
import Cookies from 'js-cookie';

@Component({
  selector: 'app-editar-gasto-modal',
  templateUrl: './editar-gasto-modal.page.html',
  styleUrls: ['./editar-gasto-modal.page.scss'],
})
export class EditarGastoModalPage {
  categorias: any[] = [];
  formulario: FormGroup;
  gasto: Gasto;

  constructor(private modalController: ModalController, private apiService: ApiService, private navParams: NavParams) {
    const id_usuario = Number(Cookies.get('id_usu'));

    // Inicializa 'usuario' con un objeto que cumple con la interfaz Usuario
    this.gasto = {
      id_usuario: id_usuario,
      id_categoria: 0 ,
      monto: '',
      fecha: undefined,
      descripcion: ''
    };

    // Inicializa 'formulario' con un nuevo FormGroup
    this.formulario = new FormGroup({
      id_usuario: new FormControl(this.gasto.id_usuario),
      id_categoria: new FormControl(this.gasto.id_categoria),
      monto: new FormControl(this.gasto.monto),
      fecha: new FormControl(this.gasto.fecha),
      descripcion: new FormControl(this.gasto.descripcion)
    });
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  guardarCambios() {
    const nuevoGasto: Gasto = {
      ...this.formulario.value,
    };

    this.apiService.insertarGasto(nuevoGasto).subscribe(response => {
      console.log(response.message);
      this.cerrarModal();
    });

    console.log(this.formulario.value);
  }

  ngOnInit() {
    this.gasto = this.navParams.get('gasto');
    this.formulario.patchValue(this.gasto);

    this.apiService.obtenerCategorias().subscribe(categorias => {
      this.categorias = categorias;
    });
  }


}


