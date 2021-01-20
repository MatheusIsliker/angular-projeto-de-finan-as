import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  constructor(private readonly http: HttpClient) { }

  public estadoService(): Observable<any> {

    return this.http.get(`assets/json/lista.json`)
  }
}
