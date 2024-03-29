import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Factura } from '../../interfaces/index';
import { HttpHeaders } from '@angular/common/http';
import { ModalController } from '@ionic/angular';

import { CrearFacturaModalPage } from './crear-factura-modal/crear-factura-modal.page';
import { EventosDelDiaModalPage } from './eventos-del-dia-modal-page/eventos-del-dia-modal.page';

@Component({
  selector: 'app-facturas-recordatorios-pagos',
  templateUrl: './facturas-recordatorios-pagos.page.html',
  styleUrls: ['./facturas-recordatorios-pagos.page.scss'],
})
export class FacturasRecordatoriosPagosPage implements OnInit {
  public resp: Factura []=[];
  public highlightedDates: { date: string, textColor: string, backgroundColor: string }[] = [];

  constructor(private newService: ApiService, private modalController: ModalController) {}

  ngOnInit() {
    const id_usuario = 16;

    this.newService.obtenerFacturas(id_usuario)
      .subscribe(resp => {
        console.log(resp);
        if (Array.isArray(resp)) {
          this.resp = resp.map(item => ({ ...item, editing: false }));
          this.loadFacturas();
        } else {
          this.resp = [{ ...resp, editing: false }];
        }
      });
  }

  loadFacturas() {
    this.resp.forEach((factura, index) => {
        let color = this.getColor(index); // Asume que tienes una función para obtener colores basados en el índice o cualquier otra lógica

        this.highlightedDates.push({
            date: factura.fecha_vencimiento,
            textColor: '#000000',
            backgroundColor: color,
        });
    });
  }

  getColor(index: number): string {
    let colors = ['#ffc0cb', '#c8e5d0', '#800080', '#09721b', 'var(--ion-color-secondary)', 'rgb(211, 200, 229)'];
    return colors[index % colors.length];
  }

  onDateSelected(event:any) {
    console.log("-------------------");
    console.log(event.detail);

    let date = new Date(event.detail.value);
    date.setHours(12); // Establecer la hora a medio día
    let formattedDate = date.toISOString().split('T')[0]; // Convertir a 'YYYY-MM-DD'

    let eventosDelDia = this.resp.filter(factura => {
      let fechaVencimiento = new Date(factura.fecha_vencimiento);
      fechaVencimiento.setHours(24); // Establecer la hora a medio día
      let formattedFechaVencimiento = fechaVencimiento.toISOString().split('T')[0]; // Convertir a 'YYYY-MM-DD'
      return formattedFechaVencimiento === formattedDate;
    });

    this.abrirModalEventos(eventosDelDia);
  }




  async abrirModalEventos(eventosDelDia:any) {
    const modal = await this.modalController.create({
      component: EventosDelDiaModalPage,
      componentProps: {
        'eventos': eventosDelDia
      }
    });

    await modal.present();
  }

  async abrirModalCrearFactura() {
    const modal = await this.modalController.create({
      component: CrearFacturaModalPage,
    });

    await modal.present();
  }

}
