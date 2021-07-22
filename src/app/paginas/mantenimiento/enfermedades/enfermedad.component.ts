import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { GestorService } from 'src/app/services/service.index';
import { Barrio } from 'src/app/models/barrio.model';
import { Enfermedad } from '../../../models/enfermedad.model';


@Component({
  selector: 'app-enfermedad',
  templateUrl: './enfermedad.component.html',
  styleUrls: []
})
export class EnfermedadComponent implements OnInit {

  forma: FormGroup;


  constructor(
    public gestorService: GestorService,
    private router: Router
  ) {
   }


  ngOnInit() {

    this.forma = new FormGroup({
      Enfermedad: new FormControl(null, Validators.required )
    });
  }

// ==================================================
//        Nueva enfermedad
// ==================================================

  nuevaEnfermedad() {

    if ( this.forma.invalid ) {
      console.log('formulario invalido' , this.forma);
      return;
    }

    console.log('Formulario valido y Registrar barrio ingreso');

    const enfermedad = new Enfermedad(
        null,
        this.forma.value.Enfermedad,
        null
    );

    this.gestorService.crearEnfermedad( enfermedad )
              .subscribe( (resp: any) => {

                console.log('resp.message en crearEnfermedad es : ', resp.mensaje);

                console.log('resp en crearEnfermedad es : ', resp);

                if ( resp.Mensaje === 'Ok') {
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Enfermedad creada',
                      showConfirmButton: false,
                      timer: 2000
                    });
                    this.router.navigate(['/mantenimiento/enfermedades']);
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
