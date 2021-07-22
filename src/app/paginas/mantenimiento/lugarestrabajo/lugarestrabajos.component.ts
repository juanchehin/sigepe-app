import { Component, OnInit } from '@angular/core';
import { GestorService } from '../../../services/service.index';
import Swal from 'sweetalert2';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { LugarTrabajo } from 'src/app/models/lugartrabajo.model';

declare var swal: any;

@Component({
  selector: 'app-lugarestrabajos',
  templateUrl: './lugarestrabajos.component.html',
  styles: []
})
export class LugaresTrabajosComponent implements OnInit {

  lugares: any;
  desde = 0;
  // cargando = false;
  totalLugares = 0;
  incluyeBajas = 0;


  constructor(
    public gestorService: GestorService
  ) {
   }

  ngOnInit() {
    this.cargarLugares();
  }

// ==================================================
// Carga de localidades del sistema
// ==================================================

cargarLugares() {
    // console.log('seleccionado  es : ', this.estadoSeleccionado );

    this.gestorService.cargarLugaresTrabajos( this.desde , this.incluyeBajas )
               .subscribe( (resp: any) => {

                console.log('resp en cargaLugaresTrabajo.component es : ', resp);

                this.totalLugares = resp[1][0].cantLugares;
                // console.log('this.totalPersonas es : ', this.totalPersonas);

                this.lugares = resp[0];
                console.log('this.cargaLugaresTrabajo es : ', this.lugares);

              });

  }
// ==================================================
//        Elimina un lugar de trabajo
// ==================================================

eliminarLugarTrabajo( lugarTrabajo: any ) {

  console.log('entro en eliminarLugarTrabajo localidad.IdPersona es ', lugarTrabajo);

  Swal.fire({
    title: '¿Esta seguro?',
    text: 'Esta a punto de borrar el lugar de trabajo ' + lugarTrabajo.LugarTrabajo,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borrar!'
  })
  .then( result => {

    if (result.value) {

      const parametro = lugarTrabajo.IdLugarTrabajo.toString();
      console.log('entro en eliminarInmueble ', parametro);
      this.gestorService.eliminarLugarTrabajo( parametro )
                .subscribe( (resp: any) => {
                    this.cargarLugares();
                    console.log('resp es : ... ', resp);
                    if ( resp.Mensaje === 'Ok') {
                      this.cargarLugares();
                      Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Lugar de trabajo eliminado',
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

  if ( desde >= this.totalLugares ) {
    console.log('Entro primer if');
    return;
  }

  if ( desde < 0 ) {
    console.log('Entro seg if');
    return;
  }
  console.log('Llego');
  this.desde += valor;
  this.cargarLugares();

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
  this.cargarLugares();
}
}
