import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
// import { UsuarioService, PersonaService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Observable, Subject } from 'rxjs';
import { Localidad } from '../../../models/localidad.model';
import { GestorService } from 'src/app/services/service.index';
import { Calle } from 'src/app/models/calle.model';


@Component({
  selector: 'app-calle',
  templateUrl: './calle.component.html',
  styleUrls: []
})
export class CalleComponent implements OnInit {

  forma: FormGroup;


  constructor(
    public gestorService: GestorService,
    private router: Router
  ) {
   }


  ngOnInit() {

    this.forma = new FormGroup({
      Calle: new FormControl(null, Validators.required )
    });
  }

// ==================================================
//        Nueva localidad
// ==================================================

  nuevaCalle() {

    if ( this.forma.invalid ) {
      console.log('formulario invalido' , this.forma);
      return;
    }

    console.log('Formulario valido y Registrar cliente ingreso');

    const calle = new Calle(
        null,
        this.forma.value.Calle,
        null
    );

    this.gestorService.crearCalle( calle )
              .subscribe( (resp: any) => {

                console.log('resp.message en crearCalle es : ', resp.mensaje);

                console.log('resp en crearCalle es : ', resp);


                /*  Transformar resp.mensaje a JSON para que se pueda acceder*/

                if ( resp.Mensaje === 'Ok') {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Calle creada',
                    showConfirmButton: false,
                    timer: 2000
                  });
                  this.router.navigate(['/mantenimiento/calles']);
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Hubo un problema al crear la calle',
                    text: resp.Mensaje
                  });
                }
              });

            }

}
