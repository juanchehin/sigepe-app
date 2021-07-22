import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { ModuloAlimenticio } from 'src/app/models/moduloAlimanticio.model';
import { GestorService } from 'src/app/services/service.index';


@Component({
  selector: 'app-moduloalimenticio',
  templateUrl: './moduloAlimenticio.component.html',
  styleUrls: []
})
export class ModuloAlimenticioComponent implements OnInit {

  forma: FormGroup;


  constructor(
    private gestorService: GestorService,
    private router: Router
  ) {
   }


  ngOnInit() {

    this.forma = new FormGroup({
        Modulo: new FormControl(null, Validators.required ),
        Observaciones: new FormControl(null, Validators.required )
    });
  }

// ==================================================
//        Nuevo Modulo
// ==================================================

  nuevoModulo() {

    if ( this.forma.invalid ) {
      console.log('formulario invalido nuevoModulo' , this.forma);
      return;
    }

    console.log('Formulario valido y Registrar barrio ingreso');

    const modulo = new ModuloAlimenticio(
        null,
        this.forma.value.Modulo,
        this.forma.value.Observaciones,
        null
    );

    this.gestorService.crearModuloAlimenticio( modulo )
              .subscribe( (resp: any) => {

                console.log('resp.message en crearModulo es : ', resp.mensaje);

                console.log('resp en crearModulo es : ', resp);

                if ( resp.Mensaje === 'Ok') {
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Modulo creado',
                      showConfirmButton: false,
                      timer: 2000
                    });
                    this.router.navigate(['/control/modulos']);
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
