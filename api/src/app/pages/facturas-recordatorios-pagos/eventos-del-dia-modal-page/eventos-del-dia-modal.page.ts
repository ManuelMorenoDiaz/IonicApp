import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-eventos-del-dia-modal',
  templateUrl: './eventos-del-dia-modal.page.html',
  styleUrls: ['./eventos-del-dia-modal.page.scss'],
})
export class EventosDelDiaModalPage implements OnInit {
  @Input() eventos: any[] = [];


  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}
