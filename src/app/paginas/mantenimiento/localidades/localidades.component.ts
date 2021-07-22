import { Component, OnInit } from '@angular/core';
import { GestorService } from '../../../services/service.index';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


declare var swal: any;

@Component({
  selector: 'app-localidades',
  templateUrl: './localidades.component.html',
  styles: []
})
export class LocalidadesComponent implements OnInit {

  localidades: any;
  desde = 0;
  // cargando = false;
  totalLocalidades = 0;
  incluyeBajas = 0;


  constructor(
    public gestorService: GestorService,
    private router: Router
  ) {
   }

  ngOnInit() {
    this.cargarLocalidades();
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
  this.cargarLocalidades();
}

// ==================================================
// Carga de localidades del sistema
// ==================================================

cargarLocalidades() {
    // console.log('seleccionado  es : ', this.estadoSeleccionado );

    this.gestorService.cargarLocalidades( this.desde , this.incluyeBajas )
               .subscribe( (resp: any) => {

                console.log('resp en localidades.component es : ', resp);

                this.totalLocalidades = resp[1][0].cantLocalidades;
                // console.log('this.totalPersonas es : ', this.totalPersonas);

                this.localidades = resp[0];
                console.log('this.localidades es : ', this.localidades);

              });

  }

// ==================================================
//        Elimina una localidad
// ==================================================

eliminarLocalidad( localidad: any ) {

  console.log('entro en eliminarlocalidad localidad.IdPersona es ', localidad);

  Swal.fire({
    title: '¿Esta seguro?',
    text: 'Esta a punto de borrar la localidad ' + localidad.Localidad,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borrar!'
  })
  .then( result => {

    if (result.value) {

      const parametro = localidad.IdLocalidad.toString();
      console.log('entro en eliminarlocalidad ', parametro);
      this.gestorService.eliminarLocalidad( parametro )
                .subscribe( (resp: any) => {
                    this.cargarLocalidades();
                    console.log('resp es : ... ', resp);
                    if ( resp.Mensaje === 'Ok') {
                      this.cargarLocalidades();
                      Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Localidad eliminada',
                        showConfirmButton: false,
                        timer: 2000
                      });
                      this.router.navigate(['/mantenimiento/localidades']);
                    } else {
                      Swal.fire({
                        icon: 'error',
                        title: 'Error al eliminar',
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

  if ( desde >= this.totalLocalidades ) {
    console.log('Entro primer if');
    return;
  }

  if ( desde < 0 ) {
    console.log('Entro seg if');
    return;
  }
  console.log('Llego');
  this.desde += valor;
  this.cargarLocalidades();

}

}
