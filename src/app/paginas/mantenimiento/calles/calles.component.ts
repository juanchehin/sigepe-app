import { Component, OnInit } from '@angular/core';
import { GestorService } from '../../../services/service.index';
import Swal from 'sweetalert2';

declare var swal: any;

@Component({
  selector: 'app-calles',
  templateUrl: './calles.component.html',
  styles: []
})
export class CallesComponent implements OnInit {

  calles: any;
  desde = 0;
  // cargando = false;
  totalCalles = 0;
  incluyeBajas = 0;


  constructor(
    public gestorService: GestorService
  ) {
   }

  ngOnInit() {
    this.cargarCalles();
  }

// ==================================================
// Carga de calles del sistema
// ==================================================

cargarCalles() {
    // console.log('seleccionado  es : ', this.estadoSeleccionado );

    this.gestorService.cargarCalles( this.desde , this.incluyeBajas )
               .subscribe( (resp: any) => {

                console.log('resp en cargarCalles.component es : ', resp);

                this.totalCalles = resp[1][0].cantCalles;
                // console.log('this.totalPersonas es : ', this.totalPersonas);
                console.log('this.totalCalles es : ', this.totalCalles);
                this.calles = resp[0];
                console.log('this.calles es : ', this.calles);

              });

  }

// ==================================================
//        Elimina una calle
// ==================================================

eliminarCalle( calle: any ) {

  console.log('entro en eliminarlocalidad localidad.IdPersona es ', calle);

  Swal.fire({
    title: '¿Esta seguro?',
    text: 'Esta a punto de borrar la calle "' + calle.Calle + '"',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borrar!'
  })
  .then( result => {

    if (result.value) {

      const parametro = calle.IdCalle.toString();
      console.log('entro en eliminarlocalidad ', parametro);
      this.gestorService.eliminarCalle( parametro )
                .subscribe( (resp: any) => {
                    this.cargarCalles();
                    console.log('resp es : ... ', resp);
                    if ( resp.Mensaje === 'Ok') {
                      this.cargarCalles();
                      Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Calle eliminada',
                        showConfirmButton: false,
                        timer: 2000
                      });
                      // this.router.navigate(['/personas']);
                    } else {
                      Swal.fire({
                        icon: 'error',
                        title: 'Error al actualizar',
                        text: resp.mensaje,
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

  const desde = this.desde + valor;

  if ( desde >= this.totalCalles ) {
    console.log('Entro primer if');
    return;
  }

  if ( desde < 0 ) {
    console.log('Entro seg if');
    return;
  }
  console.log('Llego');
  this.desde += valor;
  this.cargarCalles();

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
  this.cargarCalles();
}

}
