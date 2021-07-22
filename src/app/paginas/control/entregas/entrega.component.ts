import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ControlService } from 'src/app/services/control/control.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario/usuario.service';
declare var swal: any;

@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.component.html',
  styles: []
})
export class EntregaComponent implements OnInit {

desde = 0;
IdPersona: any;
entregas: any;
diasRestantes: any;
IdUsuario: string;
  // cargando = false;
arrayNumeros: string[] = ['1', '2', '3', '4', '5', '6', '7', '8'];
i = 0;

  constructor(
    public controlService: ControlService,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
   }

  ngOnInit() {
    this.cargarEntrega();
    this.IdUsuario = this.usuarioService.IdUsuario;
  }

// ==================================================
// Carga la entregas dado su ID
// ==================================================

cargarEntrega() {

    this.IdPersona = this.activatedRoute.snapshot.paramMap.get('IdPersona');
    console.log('this.IdEntrega cargarDatosPersona es : ', this.IdPersona);

    this.controlService.cargarEntrega( this.IdPersona )
               .subscribe( (resp: any) => {

                console.log('resp en this.IdEntrega.component es : ', resp);

                this.entregas = resp[0];
                console.log('this.entregas es : ', this.entregas);


              });

  }

// ==================================================
// Concluye la entrega dado su IdEntrega y su Nro de entrega
// ==================================================
concluirEntrega(IdEntrega) {

  Swal.fire({
    title: '¿Esta seguro?',
    text: 'Esta a punto de concluir la entrega',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, concluir!'
  })
  .then( result => {

    if (result.value) {


      console.log('entro en IdEntrega ', IdEntrega);
      console.log('entro en this.IdUsuario ', this.IdUsuario);

      this.controlService.concluirEntrega( IdEntrega, this.IdUsuario)
                .subscribe( (resp: any) => {
                    this.cargarEntrega();
                    console.log('resp es : ... cargarEntrega', resp);
                    if ( resp.Mensaje === 'Ok') {
                      this.cargarEntrega();
                      Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Entrega concluida',
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
// Permite dar de baja la entrega por incumplimiento de la persona
// ==================================================
incumplimiento(entrega) {

  Swal.fire({
    title: '¿Esta seguro?',
    text: 'Esta a punto de eliminar las entregas ',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, quitar!'
  })
  .then( result => {

    if (result.value) {

      const parametro = entrega.IdEntrega.toString();

      console.log('entro en incumplimiento ', parametro);

      this.controlService.incumplimiento( parametro , this.IdUsuario )
                .subscribe( (resp: any) => {
                    this.cargarEntrega();
                    console.log('resp es : ... eliminarBarrio', resp);
                    if ( resp.Mensaje === 'Ok') {
                      this.cargarEntrega();
                      Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Entrega eliminado',
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
