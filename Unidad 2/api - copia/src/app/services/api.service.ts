// ApiService
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiUrl = 'http://127.0.0.1:80/api1/usuarios/';

  constructor(private http: HttpClient) { }

  getTopHeadlines(): Observable<Usuario> {
    return this.http.get<Usuario>(this.apiUrl ).pipe(
      map(resp => resp)

    );
    console.log("uuuuuuuuuuuuuuuuu");
  }

  loginUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>('http://localhost/api1/login/', usuario, { responseType: 'text' as 'json' });
  }


  registrarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario, { responseType: 'text' as 'json' });
  }

  insertarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario, { responseType: 'text' as 'json' });
  }

  eliminarDato(id: number, options?: any): Observable<{}> {
    return this.http.request('delete', this.apiUrl, options);
  }

  actualizarUsuario(usuario: Usuario): Observable<any> {
    return this.http.put<any>(this.apiUrl, usuario,);
  }


}
