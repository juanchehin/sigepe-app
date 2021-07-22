import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
// import { UsuarioService, PersonaService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Observable, Subject } from 'rxjs';
import { Localidad } from '../../../models/localidad.model';
import { GestorService } from 'src/app/services/service.index';
import { Inmueble } from 'src/app/models/inmueble.model';


@Component({
  selector: 'app-inmueble',
  templateUrl: './inmueble.component.html',
  styleUrls: []
})
export class InmuebleComponent implements OnInit {

  forma: FormGroup;


  constructor(
    public gestorService: GestorService,
    private router: Router
  ) {
   }


  ngOnInit() {

    this.forma = new FormGroup({
      Inmueble: new FormControl(null, Validators.required )
    });
  }

// ==================================================
//        Nuev inmueble
// ==================================================

  nuevoInmueble() {

    if ( this.forma.invalid ) {
      console.log('formulario invalido' , this.forma);
      return;
    }

    console.log('Formulario valido y Registrar inmueble ingreso');

    const inmueble = new Inmueble(
        null,
        this.forma.value.Inmueble,
        null
    );

    this.gestorService.crearInmueble( inmueble )
              .subscribe( (resp: any) => {

                console.log('resp.message en crearInmueble es : ', resp.Mensaje);

                console.log('resp en crearLocalidad es : ', resp);


                /*  Transformar resp.mensaje a JSON para que se pueda acceder*/
                if ( resp.Mensaje === 'Ok') {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Inmueble creado',
                    showConfirmButton: false,
                    timer: 2000
                  });
                  this.router.navigate(['/mantenimiento/inmuebles']);
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error al crear',
                    text: 'Contactese con el administrador',
                  });
                  return;
                }
               });

            }

}
