import { Component, OnInit } from '@angular/core';
import { GestorService } from '../../../services/service.index';
import Swal from 'sweetalert2';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { Construccion } from 'src/app/models/construccion.model';
import { Router } from '@angular/router';

declare var swal: any;

@Component({
  selector: 'app-construcciones',
  templateUrl: './construcciones.component.html',
  styles: []
})
export class ConstruccionesComponent implements OnInit {

  construcciones: any;
  desde = 0;
  // cargando = false;
  totalConstrucciones = 0;
  incluyeBajas = 0;

  constructor(
    public gestorService: GestorService,
    private router: Router
  ) {
   }

  ngOnInit() {
    this.cargarConstrucciones();
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
  this.cargarConstrucciones();
}

// ==================================================
// Carga de Construcciones del sistema
// ==================================================

cargarConstrucciones() {
    // console.log('seleccionado  es : ', this.estadoSeleccionado );

    this.gestorService.cargarConstrucciones( this.desde, this.incluyeBajas )
               .subscribe( (resp: any) => {

                console.log('resp en Construcciones.component es : ', resp);

                this.totalConstrucciones = resp[1][0].cantCons;
                // console.log('this.totalPersonas es : ', this.totalPersonas);

                this.construcciones = resp[0];
                console.log('this.Construcciones es : ', this.construcciones);

              });

  }

// ==================================================
//        Elimina una construccion
// ==================================================

eliminarConstruccion( construccion: any ) {

  console.log('entro en eliminarlocalidad localidad.IdPersona es ', construccion);

  Swal.fire({
    title: '¿Esta seguro?',
    text: 'Esta a punto de borrar la construccion ' + construccion.Construccion,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borrar!'
  })
  .then( result => {

    if (result.value) {

      const parametro = construccion.IdConstruccion.toString();
      console.log('entro en eliminarConstruccion ', parametro);
      this.gestorService.eliminarConstruccion( parametro )
                .subscribe( (resp: any) => {
                    this.cargarConstrucciones();
                    console.log('resp es cargarConstrucciones: ... ', resp);
                    if ( resp.Mensaje === 'Ok') {
                      this.cargarConstrucciones();
                      Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Construccion eliminada',
                        showConfirmButton: false,
                        timer: 2000
                      });
                      this.router.navigate(['/mantenimiento/construcciones']);
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

  if ( desde >= this.totalConstrucciones ) {
    console.log('Entro primer if');
    return;
  }

  if ( desde < 0 ) {
    console.log('Entro seg if');
    return;
  }
  console.log('Llego');
  this.desde += valor;
  this.cargarConstrucciones();

}

}
