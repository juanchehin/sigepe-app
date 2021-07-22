import { GestorService } from '../../../services/service.index';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';
import { FormGroup, NgForm, FormControl } from '@angular/forms';
import { Barrio } from '../../../models/barrio.model';
import { TipoPedido } from '../../../models/tipoPedido.model';
declare var swal: any;

@Component({
  selector: 'app-editarpedido',
  templateUrl: './editarpedido.component.html',
  styles: []
})

export class EditarPedidoComponent implements OnInit {

  forma: FormGroup;
  TipoPedido: string;
  tipoPedido: any;
  Estado: string;
  private IdTipoPedido: string;

  constructor(public gestorService: GestorService, private activatedRoute: ActivatedRoute, private router: Router) {
    console.log('Entra en constructor : ');
  }

  ngOnInit() {
  this.cargarTipoPedido();
    // console.log('Entra en ngoninit : ', this.Correo);

  this.forma = new FormGroup({
    TipoPedido: new FormControl(null),  // Si se deja en NULL, en la BD se deja como estaba
    Estado: new FormControl(null)
  });

  console.log('this.forma actualizar TipoPedido : ', this.forma);

  }
// ==================================================
//  Carga el tipo de pedido con sus datos para mostrar en el formulario
// ==================================================

cargarTipoPedido() {

  this.IdTipoPedido = this.activatedRoute.snapshot.paramMap.get('IdTipoPedido');

  console.log('this.IdTipoPedido es : ', this.IdTipoPedido);

  this.gestorService.dameTipoPedido( this.IdTipoPedido )
             .subscribe( (resp: any) => {

              console.log('resp en dameBarrio es : ', resp);

              this.tipoPedido = resp;
              console.log('this.tipoPedido en dameBarrio es : ', this.tipoPedido);

              this.IdTipoPedido = this.tipoPedido.IdBarrio;
              this.TipoPedido = this.tipoPedido.Barrio;
              this.Estado = this.tipoPedido.Estado;
            });


}
// =================================================
//        Actualiza tipo de pedido
// ==================================================

actualizaTipoPedido( ) {
  console.log('Formulario valido y actualiza tipo de pedido');

  console.log('this.forma EN actualiza TipoPedido ES  : ', this.forma);

  const tipoPed = new TipoPedido(
    this.IdTipoPedido,
    this.forma.value.TipoPedido = this.forma.value.TipoPedido || this.TipoPedido,
    this.forma.value.Estado = this.forma.value.Estado || this.Estado
  );

  console.log('barrio armado en barrio.component es : ', tipoPed);

  this.gestorService.editarBarrio( this.IdTipoPedido , tipoPed )
             .subscribe( (resp: any) => {

             console.log('resp en tipoPed : ', resp);

             if ( resp.Mensaje === 'Ok') {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Pedido actualizado',
                showConfirmButton: false,
                timer: 2000
              });
              this.router.navigate(['/mantenimiento/tipospedidos']);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Hubo un problema al actualizar',
                text: 'Contactese con el administrador',
              });
            }
          });


}
}
