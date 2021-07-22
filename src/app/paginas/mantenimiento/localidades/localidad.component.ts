import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
// import { UsuarioService, PersonaService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Observable, Subject } from 'rxjs';
import { Localidad } from '../../../models/localidad.model';
import { GestorService } from 'src/app/services/service.index';


@Component({
  selector: 'app-localidad',
  templateUrl: './localidad.component.html',
  styleUrls: []
})
export class LocalidadComponent implements OnInit {

  forma: FormGroup;


  constructor(
    public gestorService: GestorService,
    private router: Router
  ) {
   }


  ngOnInit() {

    this.forma = new FormGroup({
      Localidad: new FormControl(null, Validators.required )
    });
  }

// ==================================================
//        Nueva localidad
// ==================================================

  nuevaLocalidad() {

    if ( this.forma.invalid ) {
      console.log('formulario invalido' , this.forma);
      return;
    }

    console.log('Formulario valido y Registrar cliente ingreso');

    const localidad = new Localidad(
        null,
        this.forma.value.Localidad,
        null
    );

    this.gestorService.crearLocalidad( localidad )
              .subscribe( (resp: any) => {

                console.log('resp.message en crearLocalidad es : ', resp.mensaje);

                console.log('resp en crearLocalidad es : ', resp);


                /*  Transformar resp.mensaje a JSON para que se pueda acceder*/

                if ( resp.Mensaje === 'Ok') {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Localidad creada',
                    showConfirmButton: false,
                    timer: 2000
                  });
                  this.router.navigate(['/mantenimiento/localidades']);
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error al crear la localidad',
                    text: 'Contactese con el administrador',
                  });
                  return;
                }
              });


            }

}
