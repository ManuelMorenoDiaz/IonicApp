import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Usuario } from 'src/app/interfaces'; // Importar la clase TopLevel desde index.ts

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  id_u?: string;
  nombre: string = '';
  correo: string = '';
  contrasena: string = '';

constructor(private apiService: ApiService) {}

enviarDatos() {
  const datos: Usuario = {
    id_u: 'some-id', // replace 'some-id' with the actual id
    nombre: this.nombre,
    correo: this.correo,
    contrasena: this.contrasena,
  };

  this.apiService.postDatos(datos).subscribe(resp => {
    console.log(resp);
  });
  

}

}
