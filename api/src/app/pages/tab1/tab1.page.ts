import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Gasto } from '../../interfaces/index';
import { HttpHeaders } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { EditarGastoModalPage } from './editar-gasto-modal/editar-gasto-modal.page';
import { CrearGastoModalPage } from './crear-gasto-modal/crear-gasto-modal.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],

})
export class Tab1Page implements OnInit {
public resp: Gasto []=[];

  constructor(private newService: ApiService, private modalController: ModalController) {}

  ngOnInit() {
  const id_u = 2;

    this.newService.obtenerGastos(id_u)
      .subscribe(resp => {
        console.log(resp);
        if (Array.isArray(resp)) {
          this.resp = resp.map(item => ({ ...item, editing: false }));
        } else {
          this.resp = [{ ...resp, editing: false }];
        }
      });
  }


  async abrirModalEditarGasto(gasto: Gasto) {
    const modal = await this.modalController.create({
      component: EditarGastoModalPage,
      componentProps: {
        gasto,
      },
    });

    await modal.present();
  }

  async abrirModalCrearGasto() {
    const modal = await this.modalController.create({
      component: CrearGastoModalPage,
    });

    await modal.present();
  }

  eliminarDato(id_g: number) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        "id_g": id_g,
      },
      responseType: 'text'
    };

    this.newService.eliminarDato(id_g, options).subscribe(
      () => {
        console.log("Usuario eliminado con éxito");
        this.resp = this.resp.filter(item => item.id_g !== id_g);
      },
      error => {
        console.error("Error al eliminar el usuario:", error);
      }
    );
  }
}
