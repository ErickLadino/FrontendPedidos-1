import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloProducto } from '../modelos/producto.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url ='http://localhost:3000';
  token: string = '';

  constructor(private http: HttpClient, private seguridadServicio: SeguridadService) {
    this.token = this.seguridadServicio.ObtenerToken();
   }

ObtenerRegistro(): Observable<ModeloProducto[]>{
  return this.http.get<ModeloProducto[]>('localhost:3000/productos');

}

CrearProducto(producto: ModeloProducto): Observable<ModeloProducto>{
  return this.http.post<ModeloProducto>("localhost:3000/productos", producto,{
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  })
}

ActualizarProducto(producto: ModeloProducto): Observable<ModeloProducto>{
  return this.http.put<ModeloProducto>("localhost:3000/productos", producto,{
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  })
}

EliminarProducto(id: string): Observable<any>{
  return this.http.delete(`${this.url}/productos/${id}`,{
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  })
}

}
