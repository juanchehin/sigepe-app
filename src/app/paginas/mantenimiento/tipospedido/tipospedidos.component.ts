import { Component, OnInit } from '@angular/core';
import { GestorService } from '../../../services/service.index';
import Swal from 'sweetalert2';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { LugarTrabajo } from 'src/app/models/lugartrabajo.model';

declare var swal: any;

@Component({
  selector: 'app-tipospedidos',
  templateUrl: './tipospedidos.component.html',
  styles: []
})
export class TiposPedidosComponent implements OnInit {

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
// Carga de tipos de pedido del sistema
// ==================================================

cargarTiposPedidos() {
    // console.log('seleccionado  es : ', this.estadoSeleccionado );

    this.gestorService.cargaTiposPedido( this.desde )
               .subscribe( (resp: any) => {

                console.log('resp en cargarTiposPedidos.component es : ', resp);

                this.totalTiposPedidos = resp[1][0].maximo;
                // console.log('this.totalPersonas es : ', this.totalPersonas);

                this.tiposPedidos = resp[0];
                console.log('this.cargaLugaresTrabajo es : ', this.tiposPedidos);

              });

  }

// ==================================================
//        Elimina un tipo de pedido
// ==================================================

eliminarTipoPedido( tipoPedido: any ) {

  console.log('entro en eliminarLugarTrabajo localidad.IdPersona es ', tipoPedido);

  Swal.fire({
    title: '¿Esta seguro?',
    text: 'Esta a punto de borrar el tipo de pedido ' + tipoPedido.Pedido,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borrar!'
  })
  .then( result => {

    if (result.value) {

      const parametro = tipoPedido.IdTipoPedido.toString();
      console.log('entro en eliminarInmueble ', parametro);
      this.gestorService.eliminarEscuela( parametro )
                .subscribe( (resp: any) => {
                    this.cargarTiposPedidos();
                    console.log('resp es : ... ', resp);
                    if ( resp.mensaje === 'Ok') {
                      this.cargarTiposPedidos();
                      Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Tipo de pedido eliminado',
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
