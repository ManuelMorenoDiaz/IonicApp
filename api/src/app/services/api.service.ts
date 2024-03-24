// ApiService
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Gasto, Usuario } from '../interfaces';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiUrl = 'http://127.0.0.1:80/api1/gastos/';

  constructor(private http: HttpClient) { }



  loginUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>('http://localhost/api1/login/', usuario, { responseType: 'text' as 'json' });
  }

  registrarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario, { responseType: 'text' as 'json' });
  }

  insertarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario, { responseType: 'text' as 'json' });
  }

  getTopHeadlines(): Observable<Gasto> {
    return this.http.get<Gasto>(this.apiUrl ).pipe(
      map(resp => resp)
    );
  }

  obtenerGastos(id_u: number): Observable<any> {
    return this.http.post<any>(this.apiUrl, { id_u: id_u });
  }


  insertarGasto(gasto: Gasto): Observable<any> {
    return this.http.post<any>(this.apiUrl, gasto, { responseType: 'text' as 'json' });
  }

  eliminarDato(id: number, options?: any): Observable<{}> {
    return this.http.request('delete', this.apiUrl, options);
  }

  actualizarGasto(gasto: Gasto): Observable<any> {
    return this.http.put<any>(this.apiUrl, gasto,);
  }

  obtenerCategorias(): Observable<any> {
    return this.http.get<any>('http://localhost/api1/categorias/');
  }
}
