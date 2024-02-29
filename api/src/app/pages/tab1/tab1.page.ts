import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Usuario } from '../../interfaces/index';
import { HttpHeaders } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { EditarUsuarioModalPage } from './editar-usuario-modal/editar-usuario-modal.page';
import { CrearUsuarioModalPage } from './crear-usuario-modal/crear-usuario-modal.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],

})
export class Tab1Page implements OnInit {
public resp: Usuario []=[];

  constructor(private newService: ApiService, private modalController: ModalController) {}

  ngOnInit() {
    this.newService.getTopHeadlines()
      .subscribe(resp => {
        console.log(resp);
        if (Array.isArray(resp)) {
          this.resp = resp.map(item => ({ ...item, editing: false }));
        } else {
          this.resp = [{ ...resp, editing: false }];
        }
      });
  }

  async abrirModalEditarUsuario(usuario: Usuario) {
    const modal = await this.modalController.create({
      component: EditarUsuarioModalPage,
      componentProps: {
        usuario,
      },
    });

    await modal.present();
  }

  async abrirModalCrearUsuario() {
    const modal = await this.modalController.create({
      component: CrearUsuarioModalPage,
    });

    await modal.present();
  }

  eliminarDato(id_u: number) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        "id_u": id_u,
      },
      responseType: 'text'
    };

    this.newService.eliminarDato(id_u, options).subscribe(
      () => {
        console.log("Usuario eliminado con éxito");
        this.resp = this.resp.filter(item => item.id_u !== id_u);
      },
      error => {
        console.error("Error al eliminar el usuario:", error);
      }
    );
  }
}
