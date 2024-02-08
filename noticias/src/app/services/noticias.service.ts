import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor( private http:HttpClient) { }

getTopHeadlines(){
 return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/everything?q=Apple&from=2024-02-06&sortBy=popularity&apiKey=3ea6b445b0d0437b89b91ae97b77faf6`);
}

}

