import { Component, OnInit } from '@angular/core';
import { GestorService } from '../../../services/service.index';
import Swal from 'sweetalert2';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { TipoPedido } from '../../../models/tipoPedido.model';

declare var swal: any;

@Component({
  selector: 'app-tipospedidos',
  templateUrl: './tipospedidos.component.html',
  styles: []
})
export class TipoPedidoComponent implements OnInit {

  tiposPedidos: any;
  desde = 0;
  // cargando = false;
  totalTiposPedidos = 0;


  constructor(
    public gestorService: GestorService
  ) {
   }

  ngOnInit() {
    this.cargarTiposPedidos();
  }

// ==================================================
// Carga de Tipos de Pedidos del sistema
// ==================================================

cargarTiposPedidos() {
    // console.log('seleccionado  es : ', this.estadoSeleccionado );

    this.gestorService.cargarLocalidades( this.desde )
               .subscribe( (resp: any) => {

                console.log('resp en localidades.component es : ', resp);

                this.totalTiposPedidos = resp[1][0].maximo;
                // console.log('this.totalPersonas es : ', this.totalPersonas);

                this.tiposPedidos = resp[0];
                console.log('this.localidades es : ', this.tiposPedidos);

              });

  }

// ==================================================
//        Elimina un tipo de pedido
// ==================================================

eliminarTipoPedido( tp: TipoPedido ) {

  console.log('entro en eliminarUsuario cliente.IdPersona es ', tp.IdTipoPedido);

  Swal.fire({
    title: '¿Esta seguro?',
    text: 'Esta a punto de borrar a ' + tp.tipoPedido,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borrar!'
  })
  .then( result => {

    if (result.value) {

      const parametro = tp.IdTipoPedido.toString();

      /*this.usuariosService.eliminarUsuario( parametro )
                .subscribe( borrado => {
                    this.cargarUsuarios();
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Usuario Eliminado',
                      showConfirmButton: false,
                      timer: 2000
                    });
                });*/
    }

  });

}

// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalTiposPedidos ) {
    console.log('Entro primer if');
    return;
  }

  if ( desde < 0 ) {
    console.log('Entro seg if');
    return;
  }
  console.log('Llego');
  this.desde += valor;
  this.cargarTiposPedidos();

}

}
