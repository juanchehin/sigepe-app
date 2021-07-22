import { Component, OnInit } from '@angular/core';
import { GestorService } from '../../../services/service.index';
import Swal from 'sweetalert2';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { Escuela } from '../../../models/escuela.model';

declare var swal: any;

@Component({
  selector: 'app-escuelas',
  templateUrl: './escuelas.component.html',
  styles: []
})
export class EscuelasComponent implements OnInit {

  escuelas: any;
  desde = 0;
  // cargando = false;
  totalEscuelas = 0;
  incluyeBajas = 0;


  constructor(
    public gestorService: GestorService
  ) {
   }

  ngOnInit() {
    this.cargarEscuelas();
  }

// ==================================================
// Carga de escuelas del sistema
// ==================================================

cargarEscuelas() {
    // console.log('seleccionado  es : ', this.estadoSeleccionado );

    this.gestorService.cargarEscuelas( this.desde , this.incluyeBajas )
               .subscribe( (resp: any) => {

                console.log('resp en escuelas.component es : ', resp);

                this.totalEscuelas = resp[1][0].cantEsc;
                // console.log('this.totalPersonas es : ', this.totalPersonas);

                this.escuelas = resp[0];
                console.log('this.escuelas es : ', this.escuelas);

              });

  }


// ==================================================
//        Da de baja una escuela
// ==================================================

eliminarEscuela( escuela: any ) {

  console.log('entro en eliminarEscuela localidad.IdPersona es ', escuela);

  Swal.fire({
    title: '¿Esta seguro?',
    text: 'Esta a punto de borrar la escuela ' + escuela.Escuela,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borrar!'
  })
  .then( result => {

    if (result.value) {

      const parametro = escuela.IdEscuela.toString();
      console.log('entro en eliminarEscuela ', parametro);
      this.gestorService.eliminarEscuela( parametro )
                .subscribe( (resp: any) => {
                    this.cargarEscuelas();
                    console.log('resp es : ... ', resp);
                    if ( resp.Mensaje === 'Ok') {
                      this.cargarEscuelas();
                      Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Escuela eliminada',
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

  if ( desde >= this.totalEscuelas ) {
    console.log('Entro primer if');
    return;
  }

  if ( desde < 0 ) {
    console.log('Entro seg if');
    return;
  }
  console.log('Llego');
  this.desde += valor;
  this.cargarEscuelas();

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
  this.cargarEscuelas();
}

}
