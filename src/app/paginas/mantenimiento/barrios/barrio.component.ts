import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { GestorService } from 'src/app/services/service.index';
import { Barrio } from 'src/app/models/barrio.model';


@Component({
  selector: 'app-barrio',
  templateUrl: './barrio.component.html',
  styleUrls: []
})
export class BarrioComponent implements OnInit {

  forma: FormGroup;


  constructor(
    public gestorService: GestorService,
    private router: Router
  ) {
   }


  ngOnInit() {

    this.forma = new FormGroup({
      Barrio: new FormControl(null, Validators.required )
    });
  }

// ==================================================
//        Nuevo barrio
// ==================================================

  nuevoBarrio() {

    if ( this.forma.invalid ) {
      console.log('formulario invalido' , this.forma);
      return;
    }

    console.log('Formulario valido y Registrar barrio ingreso');

    const barrio = new Barrio(
        null,
        this.forma.value.Barrio,
        null
    );

    this.gestorService.crearBarrio( barrio )
              .subscribe( (resp: any) => {

                console.log('resp.message en crearCalle es : ', resp.mensaje);

                console.log('resp en crearCalle es : ', resp);

                if ( resp.Mensaje === 'Ok') {
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Barrio creado',
                      showConfirmButton: false,
                      timer: 2000
                    });
                    this.router.navigate(['/mantenimiento/barrios']);
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: 'Contactese con el administrador',
                    });
                    return;
                  }
                 });
            }
}
