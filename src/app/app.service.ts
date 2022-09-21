import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Respuesta } from './app';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  url = environment.baseURL;


  constructor(public http: HttpClient) { }

 public getPersonas():Observable<Respuesta> {
    return this.http.get<Respuesta>(this.url);
  }

}
