import { Component, OnInit } from '@angular/core';
import Cookies from 'js-cookie';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public resp: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(){
    const id_u = Cookies.get('id_usu'); // Aquí se obtiene id_u como una cadena

    if (id_u) { // Verifica si id_u está definido
      this.apiService.obtenerUsuario(id_u).subscribe((resp: any) => {
        console.log("--------------------");
        console.log(resp);
        this.resp = resp;
        console.log(this.resp); // Mueve esta línea aquí
      });
    } else {
      console.log('No se encontró la cookie id_usu');
    }

  }

  actualizar() {
    this.apiService.actualizarUsuario(this.resp).subscribe((res: any) => {
      console.log(res);
    });
  }


}
