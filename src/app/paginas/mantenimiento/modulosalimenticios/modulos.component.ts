import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ControlService } from 'src/app/services/control/control.service';
import { Router } from '@angular/router';
import { GestorService } from 'src/app/services/service.index';


declare var swal: any;

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styles: []
})
export class ModulosAlimenticiosComponent implements OnInit {

modulos: any;
desde = 0;
  // cargando = false;
totalModulos = 0;
incluyeBajas = 0;


  constructor(
    public gestorService: GestorService,
    private router: Router
  ) {
   }

  ngOnInit() {
    this.cargarModulos();
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
  this.cargarModulos();
}

// ==================================================
// Carga los modulos del sistema
// ==================================================

cargarModulos() {

    this.gestorService.cargarModulosAlimenticios( this.desde , this.incluyeBajas )
               .subscribe( (resp: any) => {

                console.log('resp en cargarModulos.component es : ', resp);

                this.totalModulos = resp[1][0].cantModulos;

                this.modulos = resp[0];
                console.log('this.totalModulos es : ', this.totalModulos);

              });

  }

// ==================================================
//   Da de baja un modulo
// ==================================================

eliminarModulo( modulo: any ) {

  console.log('entro en eliminarModulo modulo es ', modulo);

  Swal.fire({
    title: '¿Esta seguro?',
    text: 'Esta a punto de borrar al modulo "' + modulo.Modulo + '"',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borrar!'
  })
  .then( result => {

    if (result.value) {

      const parametro = modulo.IdModuloAlimenticio.toString();
      console.log('entro en IdModuloAlimenticio ', parametro);

      this.gestorService.eliminarModuloAlimenticio( parametro )
                .subscribe( (resp: any) => {
                    this.cargarModulos();
                    console.log('resp es : ... eliminarModuloAlimenticio', resp);

                    if ( resp.Mensaje === 'Ok') {
                      this.cargarModulos();
                      Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Modulo eliminado',
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

  if ( this.desde >= this.totalModulos ) {
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
  this.cargarModulos();

}

}
