import { Component, OnInit } from '@angular/core';
import { GestorService } from '../../../services/service.index';
import Swal from 'sweetalert2';


declare var swal: any;

@Component({
  selector: 'app-enfermedades',
  templateUrl: './enfermedades.component.html',
  styles: []
})
export class EnfermedadesComponent implements OnInit {

enfermedades: any;
desde = 0;
  // cargando = false;
  totalEnfermedades = 0;
  incluyeBajas = 0;


  constructor(
    public gestorService: GestorService
  ) {
   }

  ngOnInit() {
    this.cargarEnfermedades();
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
  this.cargarEnfermedades();
}

// ==================================================
// Carga de enfermedades del sistema
// ==================================================

cargarEnfermedades() {
    // console.log('seleccionado  es : ', this.estadoSeleccionado );

    this.gestorService.cargarEnfermedades( this.desde , this.incluyeBajas )
               .subscribe( (resp: any) => {

                console.log('resp en cargarEnfermedades.component es : ', resp);

                this.totalEnfermedades = resp[1][0].cantEnfermedades;
                // console.log('this.totalPersonas es : ', this.totalPersonas);

                this.enfermedades = resp[0];
                console.log('this.totalBarrios es : ', this.totalEnfermedades);

              });

  }

// ==================================================
//        Elimina una enfermedad
// ==================================================

eliminarEnfermedad( enfermedad: any ) {

  console.log('entro en eliminarEnfermedad enfermeda.IdPersona es ', enfermedad);

  Swal.fire({
    title: '¿Esta seguro?',
    text: 'Esta a punto de borrar la enfermedad ' + enfermedad.Enfermedad,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borrar!'
  })
  .then( result => {

    if (result.value) {

      const parametro = enfermedad.IdEnfermedad.toString();
      console.log('entro en eliminarEnfermedad ', parametro);
      this.gestorService.eliminarEnfermedad( parametro )
                .subscribe( (resp: any) => {
                    this.cargarEnfermedades();
                    console.log('resp es : ... eliminarEnfermedad', resp);
                    if ( resp.Mensaje === 'Ok') {
                      this.cargarEnfermedades();
                      Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Enfermedad eliminada',
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

  if ( this.desde >= this.totalEnfermedades ) {
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
  this.cargarEnfermedades();

}

}
