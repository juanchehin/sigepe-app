import { Component, OnInit } from '@angular/core';
import { GestorService } from '../../../services/service.index';
import Swal from 'sweetalert2';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { Inmueble } from '../../../models/inmueble.model';
import { Router } from '@angular/router';

declare var swal: any;

@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.component.html',
  styles: []
})
export class InmueblesComponent implements OnInit {

  inmuebles: any;
  desde = 0;
  // cargando = false;
  totalInmuebles = 0;
  incluyeBajas = 0;


  constructor(
    public gestorService: GestorService,
    private router: Router
  ) {
   }

  ngOnInit() {
    this.cargarInmuebles();
  }

// ==================================================
//        Modifica la bandera de incluye bajas
// ==================================================
modificaBandera(  ) {

  if (this.incluyeBajas === 0) {
  this.incluyeBajas = 1;
  } else {
  this.incluyeBajas = 0;
  }
  this.cargarInmuebles();
}

// ==================================================
// Carga de Inmbuebles del sistema
// ==================================================

cargarInmuebles() {

    this.gestorService.cargarInmuebles( this.desde , this.incluyeBajas )
               .subscribe( (resp: any) => {

                console.log('resp en Inmuebles.component es : ', resp);

                this.totalInmuebles = resp[1][0].cantInmueble;
                // console.log('this.totalPersonas es : ', this.totalPersonas);

                this.inmuebles = resp[0];
                console.log('this.Inmuebles es : ', this.inmuebles);

              });

  }


// ==================================================
//        Elimina un inmueble
// ==================================================

eliminarInmueble( inmueble: any ) {

  console.log('entro en eliminarInmueble localidad.IdPersona es ', inmueble);

  Swal.fire({
    title: '¿Esta seguro?',
    text: 'Esta a punto de borrar el inmueble ' + inmueble.SituacionInmueble,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borrar!'
  })
  .then( result => {

    if (result.value) {

      const parametro = inmueble.IdSituacionInmueble.toString();
      console.log('entro en eliminarInmueble ', parametro);
      this.gestorService.eliminarInmueble( parametro )
                .subscribe( (resp: any) => {
                    this.cargarInmuebles();
                    console.log('resp es : ... ', resp);
                    if ( resp.mensaje === 'Ok') {
                      this.cargarInmuebles();
                      Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Situacion de Inmueble eliminada',
                        showConfirmButton: false,
                        timer: 2000
                      });
                      this.router.navigate(['/mantenimiento/inmuebles']);
                    } else {
                      Swal.fire({
                        icon: 'error',
                        title: 'Error al actualizar',
                        text: 'Contactese con el administrador',
                      });
                      return;
                    }
                   });
    }

  });

}
// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  // const desde = this.desde + valor;

  if ( this.desde >= this.totalInmuebles ) {
    console.log('Entro primer if');
    return;
  }

  if ( this.desde < 0 ) {
    this.desde = 0;
    console.log('Entro seg if');
    return;
  }
  console.log('Llego');
  this.desde += valor;
  this.cargarInmuebles();

}

}
