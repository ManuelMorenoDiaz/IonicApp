import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AhorroInversion } from '../../interfaces/index';
import { HttpHeaders } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { CrearAhorroInversionModalPage } from './crear-ahorros-inversiones-modal/crear-ahorros-inversiones-modal.page';
import Cookies from 'js-cookie';

@Component({
  selector: 'app-ahorros-inversiones',
  templateUrl: 'ahorros-inversiones.page.html',
  styleUrls: ['ahorros-inversiones.page.scss'],
})
export class AhorroInversionPage implements OnInit {
  public resp: AhorroInversion []=[];
  contadorTotal: number = 0;
  contadorAhorros:number=0;
  contadorInversiones:number=0;
  filter: string = 'total';

  constructor(private newService: ApiService, private modalController: ModalController) {}

  ngOnInit() {
    const id_u = Number(Cookies.get('id_usu'));
    this.newService.obtenerAhorrosInversiones(id_u)
      .subscribe((resp: AhorroInversion[]) => {
        this.contadorAhorros = resp
          .filter(c => c.tipo == "Ahorro")
          .reduce((sum, current) => sum + Number(current.monto), 0);
        this.contadorInversiones = resp
          .filter(c => c.tipo == "Inversion")
          .reduce((sum, current) => sum + Number(current.monto), 0);
        this.contadorTotal = this.contadorAhorros+this.contadorInversiones;
        if (Array.isArray(resp)) {
          this.resp = resp.map(item => ({ ...item, editing: false }));
        }
      });
  }

  setFilter(filter: string) {
    this.filter = filter;
  }

  getFilteredItems() {
    if (this.filter === 'total') {
      return this.resp;
    } else if (this.filter === 'ahorros') {
      return this.resp.filter(item => item.tipo === 'Ahorro');
    } else if (this.filter === 'inversiones') {
      return this.resp.filter(item => item.tipo === 'Inversion');
    }
    return this.resp; // retorno por defecto
  }


  async abrirModalCrearAhorroInversion() {
    const modal = await this.modalController.create({
      component: CrearAhorroInversionModalPage,
    });

    await modal.present();
  }

  eliminarDato(id_a: number) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        "id_a": id_a,
      },
      responseType: 'text'
    };

    this.newService.eliminarAhorroInversion(id_a, options).subscribe(
      () => {
        console.log("Eliminado con éxito");
        this.resp = this.resp.filter(item => item.id_a !== id_a);
      },
      error => {
        console.error("Error al eliminar:", error);
      }
    );
  }
}
