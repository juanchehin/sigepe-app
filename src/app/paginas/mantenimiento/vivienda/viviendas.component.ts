import { Component, OnInit } from '@angular/core';
import { GestorService } from '../../../services/service.index';
import Swal from 'sweetalert2';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { Vivienda } from '../../../models/vivienda.model';

declare var swal: any;

@Component({
  selector: 'app-viviendas',
  templateUrl: './viviendas.component.html',
  styles: []
})
export class ViviendasComponent implements OnInit {

  viviendas: any;
  desde = 0;
  // cargando = false;
  totalViviendas = 0;
  incluyeBajas = 0;


  constructor(
    public gestorService: GestorService
  ) {
   }

  ngOnInit() {
    this.cargarViviendas();
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
  this.cargarViviendas();
}
// ==================================================
// Carga de viviendas del sistema
// ==================================================

cargarViviendas() {
    // console.log('seleccionado  es : ', this.estadoSeleccionado );

    this.gestorService.cargarViviendas( this.desde , this.incluyeBajas)
               .subscribe( (resp: any) => {

                console.log('resp en viviendas.component es : ', resp);

                this.totalViviendas = resp[1][0].cantViviendas;
                // console.log('this.totalPersonas es : ', this.totalPersonas);

                this.viviendas = resp[0];
                console.log('this.viviendas es : ', this.viviendas);

              });

  }

// ==================================================
//        Eliminar una vivienda
// ==================================================

eliminarVivienda( vivienda: any ) {

  console.log('entro en eliminarLugarTrabajo localidad.vivienda es ', vivienda);

  Swal.fire({
    title: '¿Esta seguro?',
    text: 'Esta a punto de borrar la vivienda ' + vivienda.Vivienda,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borrar!'
  })
  .then( result => {

    if (result.value) {

      const parametro = vivienda.IdVivienda.toString();
      console.log('entro en eliminarInmueble ', parametro);
      this.gestorService.eliminarVivienda( parametro )
                .subscribe( (resp: any) => {
                    this.cargarViviendas();
                    console.log('resp es : ... ', resp);
                    if ( resp.mensaje === 'Ok') {
                      this.cargarViviendas();
                      Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Vivienda eliminada',
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

  if ( desde >= this.totalViviendas ) {
    console.log('Entro primer if');
    return;
  }

  if ( desde < 0 ) {
    console.log('Entro seg if');
    return;
  }
  console.log('Llego');
  this.desde += valor;
  this.cargarViviendas();

}

}
