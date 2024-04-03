// ApiService
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Gasto, Usuario, Factura, Consejo, AhorroInversion } from '../interfaces';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiUrl = 'http://127.0.0.1:80/api1/gastos/';
  public apiUrlFacturas = 'http://127.0.0.1:80/api1/facturas/';
  public apiUrlConsejos = 'http://127.0.0.1:80/api1/consejos/';
  public apiUrlAhorrosInversiones = 'http://127.0.0.1:80/api1/ahorros_inversiones/';


  constructor(private http: HttpClient) { }

  loginUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>('http://localhost/api1/login/', usuario, { responseType: 'text' as 'json' });
  }

  registrarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>('http://localhost/api1/usuarios/', usuario, { responseType: 'text' as 'json' });
  }

  insertarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>('http://localhost/api1/usuarios/', usuario, { responseType: 'text' as 'json' });
  }

  getTopHeadlines(): Observable<Gasto> {
    return this.http.get<Gasto>(this.apiUrl ).pipe(
      map(resp => resp)
    );
  }

  getConsejos(): Observable<Consejo> {
    return this.http.get<Consejo>(this.apiUrlConsejos ).pipe(
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



  obtenerFacturas(id_usuario: number): Observable<any> {
    return this.http.post<any>(this.apiUrlFacturas, { id_usuario: id_usuario });
  }

  insertarFactura(factura: Factura): Observable<any> {
    return this.http.post<any>(this.apiUrlFacturas, factura, { responseType: 'text' as 'json' });
  }

  eliminarFactura(id: number, options?: any): Observable<{}> {
    return this.http.request('delete', this.apiUrlFacturas, options);
  }

  actualizarFactura(gasto: Gasto): Observable<any> {
    return this.http.put<any>(this.apiUrlFacturas, gasto,);
  }


  obtenerAhorrosInversiones(id_u: number): Observable<any> {
    return this.http.post<any>(this.apiUrlAhorrosInversiones, { id_u: id_u });
  }

  insertarAhorroInversion(AhorroInversion: AhorroInversion): Observable<any> {
    return this.http.post<any>(this.apiUrlAhorrosInversiones, AhorroInversion, { responseType: 'text' as 'json' });
  }

  eliminarAhorroInversion(id: number, options?: any): Observable<{}> {
    return this.http.request('delete', this.apiUrlAhorrosInversiones, options);
  }

  actualizarAhorroInversione(ahorroInversion: AhorroInversion): Observable<any> {
    return this.http.put<any>(this.apiUrlAhorrosInversiones, ahorroInversion,);
  }



}
