import { Component, OnInit } from '@angular/core';
import { GestorService } from '../../../services/service.index';
import Swal from 'sweetalert2';


declare var swal: any;

@Component({
  selector: 'app-barrios',
  templateUrl: './barrios.component.html',
  styles: []
})
export class BarriosComponent implements OnInit {

  barrios: any;
  desde = 0;
  // cargando = false;
  totalBarrios = 0;
  incluyeBajas = 0;


  constructor(
    public gestorService: GestorService
  ) {
   }

  ngOnInit() {
    this.cargarBarrios();
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
  this.cargarBarrios();
}

// ==================================================
// Carga de barrios del sistema
// ==================================================

cargarBarrios() {
    // console.log('seleccionado  es : ', this.estadoSeleccionado );

    this.gestorService.cargarBarrios( this.desde , this.incluyeBajas )
               .subscribe( (resp: any) => {

                console.log('resp en cargarBarrios.component es : ', resp);

                this.totalBarrios = resp[1][0].cantBarrios;
                // console.log('this.totalPersonas es : ', this.totalPersonas);

                this.barrios = resp[0];
                console.log('this.totalBarrios es : ', this.totalBarrios);

              });

  }

// ==================================================
//        Elimina un barrio
// ==================================================

eliminarBarrio( barrio: any ) {

  console.log('entro en eliminarBarrio barrio.IdPersona es ', barrio);

  Swal.fire({
    title: '¿Esta seguro?',
    text: 'Esta a punto de borrar al barrio ' + barrio.Barrio,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borrar!'
  })
  .then( result => {

    if (result.value) {

      const parametro = barrio.IdBarrio.toString();
      console.log('entro en eliminarBarrio ', parametro);
      this.gestorService.eliminarBarrio( parametro )
                .subscribe( (resp: any) => {
                    this.cargarBarrios();
                    console.log('resp es : ... eliminarBarrio', resp);
                    if ( resp.mensaje === 'Ok') {
                      this.cargarBarrios();
                      Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Barrio eliminado',
                        showConfirmButton: false,
                        timer: 2000
                      });
                      // this.router.navigate(['/personas']);
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

  });

}

// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  this.desde += valor;

  if ( this.desde >= this.totalBarrios ) {
    console.log('Entro primer if');
    return;
  }

  if ( this.desde < 0 ) {
    console.log('Entro seg if');
    this.desde = 0;
    return;
  }
  console.log('Llego');
  // this.desde += valor;
  this.cargarBarrios();

}

}
