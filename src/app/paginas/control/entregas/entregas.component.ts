import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ControlService } from 'src/app/services/control/control.service';
import { Router } from '@angular/router';
import { GestorService, UsuarioService } from 'src/app/services/service.index';
declare var swal: any;

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.component.html',
  styles: []
})
export class EntregasComponent implements OnInit {

desde = 0;
IdModulo: any;
entregas: any;
diasRestantes: any;
IdUsuario: string;
  // cargando = false;
totalEntregas = 0;
filtroSeleccionado: any = -1;
barrioSeleccionado = -1;
barrios: any;


  constructor(
    public controlService: ControlService,
    public gestorService: GestorService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
   }

  ngOnInit() {
    this.IdUsuario = this.usuarioService.IdUsuario;
    this.cargarEntregas();
    this.cargarBarrios();
  }
// ==================================================
// Detecta los cambios en el select de los planes y carga IdPlan en 'nuevoValor'
// ==================================================
cambios(nuevoValor) {

  this.filtroSeleccionado = nuevoValor;
  console.log('this.filtroSeleccionado ', this.filtroSeleccionado);
  this.desde = 0;
  this.cargarEntregas();
}
// ==================================================
// Detecta los cambios en el select de los planes y carga IdPlan en 'nuevoValor'
// ==================================================
cambiosBarrios(nuevoValorBarrio) {

  this.barrioSeleccionado = nuevoValorBarrio;
  console.log('this.nuevoValorBarrio ', this.barrioSeleccionado);
  this.desde = 0;
  this.cargarEntregas();
}
// ==================================================
// Carga las entregas
// ==================================================

cargarEntregas() {

    this.controlService.cargarEntregas( this.desde , this.filtroSeleccionado , this.barrioSeleccionado )
               .subscribe( (resp: any) => {

                console.log('resp en cargarEntregas.component es : ', resp);

                // this.diasRestantes = ;

                this.entregas = resp[0];
                console.log('this.entregas es : ', this.entregas);


              });

  }
// ==================================================
//        Carga de barrios desde la BD
// ==================================================

cargarBarrios() {

  this.gestorService.dameBarriosAlta( )
             .subscribe( (resp: any) => {

              console.log('resp en cargarBarrios todas en nuevaentrega.component es : ', resp);

//              this.totalClientes = resp[1][0].maximo;
              this.barrios = resp[0];
              console.log('this.barrios todas es : ', this.barrios);

            });

}
// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  this.desde += valor;

  // if ( this.desde >= this.totalEntregas ) {
  //   console.log('Entro primer if');
  //   return;
  // }

  if ( this.desde < 0 ) {
    console.log('Entro seg if');
    this.desde = 0;
    return;
  }
  console.log('Llego');
  // this.desde += valor;
  this.cargarEntregas();

}
// ==================================================
// Permite dar de baja la entrega por incumplimiento de la persona
// ==================================================
incumplimiento(entrega) {

  Swal.fire({
    title: '¿Esta seguro?',
    text: 'Esta a punto de eliminar las entregas por incumplimiento',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, quitar!'
  })
  .then( result => {

    if (result.value) {

      const parametro = entrega.IdPersona.toString();

      console.log('entro en incumplimiento ', parametro);

      this.controlService.incumplimiento( parametro , this.IdUsuario)
                .subscribe( (resp: any) => {
                    this.cargarEntregas();
                    console.log('resp es : ... incumplimiento', resp);
                    if ( resp.Mensaje === 'Ok') {
                      this.cargarEntregas();
                      Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Entrega eliminada',
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

}
