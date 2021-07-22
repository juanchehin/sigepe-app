import { Component, OnInit } from '@angular/core';
import { GestorService } from '../../../services/service.index';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


declare var swal: any;

@Component({
  selector: 'app-tiposviviendas',
  templateUrl: './tiposviviendas.component.html',
  styles: []
})
export class TiposViviendasComponent implements OnInit {

  viviendas: any;
  desde = 0;
  // cargando = false;
  totalBarrios = 0;
  incluyeBajas = 0;
  totalTiposViviendas = 0;


  constructor(
    public gestorService: GestorService,
    private router: Router
  ) {
   }

  ngOnInit() {
    this.cargarTiposViviendas();
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
  this.cargarTiposViviendas();
}

// ==================================================
// Carga de tipos de vivienda del sistema
// ==================================================

cargarTiposViviendas() {
    // console.log('seleccionado  es : ', this.estadoSeleccionado );

    this.gestorService.cargarTiposViviendas( this.desde , this.incluyeBajas )
               .subscribe( (resp: any) => {

                console.log('resp en cargarTiposViviendas.component es : ', resp);

                this.totalTiposViviendas = resp[1][0].cantTiposVivienda;
                console.log('this.totalTiposViviendas es : ', this.totalBarrios);

                this.viviendas = resp[0];
                console.log('this.viviendas es : ', this.viviendas);

              });

  }

// ==================================================
//        Elimina un tipo de vivienda
// ==================================================

eliminarTipoVivienda( tipovivienda: any ) {

  console.log('entro en eliminarTipoVivienda  es tipovivienda', tipovivienda);

  Swal.fire({
    title: '¿Esta seguro?',
    text: 'Esta a punto de borrar al tipo de vivienda "' + tipovivienda.Vivienda + '"',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borrar!'
  })
  .then( result => {

    if (result.value) {

      const parametro = tipovivienda.IdTipoVivienda.toString();

      console.log('entro en eliminartipovivienda ', parametro);
      this.gestorService.eliminarTipoVivienda( parametro )
                .subscribe( (resp: any) => {
                    this.cargarTiposViviendas();
                    console.log('resp.Mensaje es : ... eliminarTipoVivienda', resp.Mensaje);

                    if ( resp.Mensaje === 'Ok') {
                      Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Tipo de vivienda eliminada',
                        showConfirmButton: false,
                        timer: 2000
                      });
                      this.cargarTiposViviendas();
                      this.router.navigate(['/mantenimiento/tipospedidos']);
                    } else {
                      Swal.fire({
                        icon: 'error',
                        title: 'Error al borrar',
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
  this.cargarTiposViviendas();

}

}
