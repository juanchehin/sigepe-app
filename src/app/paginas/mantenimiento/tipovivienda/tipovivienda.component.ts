import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { GestorService } from 'src/app/services/service.index';
import { TipoVivienda } from 'src/app/models/tipovivienda.model';


@Component({
  selector: 'app-tipovivienda',
  templateUrl: './tipovivienda.component.html',
  styleUrls: []
})
export class TipoViviendaComponent implements OnInit {

  forma: FormGroup;


  constructor(
    public gestorService: GestorService,
    private router: Router
  ) {
   }


  ngOnInit() {

    this.forma = new FormGroup({
      TipoVivienda: new FormControl(null, Validators.required )
    });
  }

// ==================================================
//        Nuevo tipo de vivienda
// ==================================================

  nuevoTipoVivienda() {

    if ( this.forma.invalid ) {
      console.log('formulario invalido' , this.forma);
      return;
    }

    console.log('Formulario valido y nuevoTipoVivienda ingreso');

    const tipovivienda = new TipoVivienda(
        null,
        this.forma.value.TipoVivienda,
        null
    );

    this.gestorService.crearTipoVivienda( tipovivienda )
              .subscribe( (resp: any) => {

                console.log('resp en crearTipoVivienda es : ', resp);

                if ( resp.Mensaje === 'Ok') {
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Tipo de vivienda creada',
                      showConfirmButton: false,
                      timer: 2000
                    });
                    this.router.navigate(['/mantenimiento/tiposviviendas']);
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
