import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
//import * as cryptoJS from 'crypto-js';
const cryptoJS = require('crypto-js');


@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit{

  fgValidator: FormGroup = this.fb.group ({
    "usuario":["",[Validators.required, Validators.email]],
    "clave": ["", [Validators.required]]
  });

  constructor (private fb: FormBuilder, 
    private servicioSeguridad: SeguridadService,
    private router: Router){}

  ngOnInit(): void {
    
      
  }

  IdentificarUsuario(){
    let usuario = this.fgValidator.controls["usuario"].value;
    let clave = this.fgValidator.controls["clave"].value;
    //ensayis de que esta tomando los valores del formulario
    //alert(usuario);
    //alert(clave);
    let claveCifrada = cryptoJS.MD5(clave).toString();
    this.servicioSeguridad.Identificar(usuario, claveCifrada).subscribe((datos:any)=>{
      this.servicioSeguridad.AlmacenarSesion(datos);
      this.router.navigate(["/inicio"])
      //ok
      //alert("Datos correctos")
    }, (error: any) => {
      alert("Datos invalidos")
    })
  }

}
