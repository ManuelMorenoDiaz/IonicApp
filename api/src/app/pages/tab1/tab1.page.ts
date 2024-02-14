import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Usuario } from '../../interfaces/index';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
public resp: Usuario []=[];

  constructor(private newService: ApiService ) {}
  ngOnInit() {
    this.newService.getTopHeadlines()
      .subscribe(resp => {
        console.log(resp);
        if (Array.isArray(resp)) {
          this.resp = resp;
        } else {
          this.resp = [resp];
        }
      });
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

