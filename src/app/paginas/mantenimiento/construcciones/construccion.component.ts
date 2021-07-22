import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
// import { UsuarioService, PersonaService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Observable, Subject } from 'rxjs';
import { Localidad } from '../../../models/localidad.model';
import { GestorService } from 'src/app/services/service.index';
import { Construccion } from '../../../models/construccion.model';


@Component({
  selector: 'app-construccion',
  templateUrl: './construccion.component.html',
  styleUrls: []
})
export class ConstruccionComponent implements OnInit {

  forma: FormGroup;


  constructor(
    public gestorService: GestorService,
    private router: Router
  ) {
   }


  ngOnInit() {

    this.forma = new FormGroup({
      Construccion: new FormControl(null, Validators.required )
    });
  }

// ==================================================
//        Nueva Construccion
// ==================================================

  nuevaConstruccion() {

    if ( this.forma.invalid ) {
      console.log('formulario invalido Construccion' , this.forma);
      return;
    }

    console.log('Formulario valido y Registrar Construccion ingreso');

    const construccion = new Construccion(
        null,
        this.forma.value.Construccion,
        null
    );

    this.gestorService.crearConstruccion( construccion )
              .subscribe( (resp: any) => {

                console.log('resp.message en crearConstruccion es : ', resp.mensaje);

                console.log('resp en crearConstrucciond es : ', resp);


                /*  Transformar resp.mensaje a JSON para que se pueda acceder*/

                if ( resp.Mensaje === 'Ok') {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Construccion creada',
                    showConfirmButton: false,
                    timer: 2000
                  });
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Hubo un problema al crear la construccion',
                    text: resp.Mensaje
                  });
                }
                this.router.navigate(['/mantenimiento/construcciones']);
              });


            }

}
