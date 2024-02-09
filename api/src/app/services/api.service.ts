import { Injectable, Pipe } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Usuario } from '../interfaces';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiUrl = 'http://127.0.0.1:80/api1/usuarios/';

  constructor(private http: HttpClient) { }
  getTopHeadlines(): Observable<Usuario> {
    return this.http.get<Usuario>(this.apiUrl).pipe(
      map(resp => resp)
    );
  }

  // Método para enviar datos por POST
  postDatos(datos: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, datos);
  }
}
