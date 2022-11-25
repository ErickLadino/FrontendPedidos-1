import { Component } from '@angular/core';
import { subscribeOn, Subscription } from 'rxjs';
import { subscriptionLogsToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { ModeloIdentificar } from 'src/app/modelos/identificar.modelo';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
export class BarraNavegacionComponent {

  seInicioSesion: boolean = false;

  subs: Subscription = new Subscription();

  constructor(private seguridadServicio : SeguridadService){}
  

  ngOnInit(): void{
    this.subs =this.seguridadServicio.ObtenerDatosUsuarioEnSesion().subscribe((datos: ModeloIdentificar) => {
      this.seInicioSesion =datos.estaIdentificado;
    })

  }
}
