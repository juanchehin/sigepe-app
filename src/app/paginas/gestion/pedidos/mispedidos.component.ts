import { Component, OnInit } from '@angular/core';
import { PersonaService, PedidoService } from '../../../services/service.index';
import Swal from 'sweetalert2';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from 'src/app/models/pedido.model';
import { UsuarioService } from 'src/app/services/service.index';

declare var swal: any;

@Component({
  selector: 'app-mispedidos',
  templateUrl: './mispedidos.component.html',
  styles: []
})
export class MisPedidosComponent implements OnInit {

  pedidos: Pedido[] = [];
  date = '';
  misPedidos: any;
  desde = 0;

  IdPersona: string;
  Apellidos: string;
  Nombres: string;

  forma: FormGroup;
  totalPedidos = 0;
  cargando = true;
  planSeleccionado = 0;  // Parametro seleccionado en el SELECT de planes
  estadoSeleccionado = 'N';  // Parametro seleccionado en el SELECT de los estados de clientes
  mensajesNoLeidos = 0;


  constructor(
    public personaService: PersonaService,
    public usuarioService: UsuarioService,
    public pedidoService: PedidoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.planSeleccionado = 0;
   }

  ngOnInit() {
    this.IdPersona = this.activatedRoute.snapshot.paramMap.get('id');
    this.cargarMisPedidos();
  }


// ==================================================
//  Carga los pedidos asignados para una persona
// ==================================================

cargarMisPedidos() {

  console.log('this.IdPersona cargarDatos es : ', this.IdPersona);

  // Devuelve SocioEconomico y Apellido y nombre de la persona (Para cargar en el HTML)
  this.usuarioService.dameMisPedidos( this.IdPersona , this.desde )
             .subscribe( (resp: any) => {

              console.log('resp en cargarMisPedidos es : ', resp);

              this.misPedidos = resp[0];
              console.log('this.misPedidos en dameMisPedidos es : ', this.misPedidos);

              // this.mensajesNoLeidos = resp[0][0].mensajesPendientes;
              // console.log('this.mensajesNoLeidos en dameMisPedidos es : ', this.mensajesNoLeidos);
            });

  }
// ==================================================
//  Carga los mensajes no leidos para notificar al usuario
// ==================================================
/*
cargarMensajesPendientes() {

  console.log('this.IdPersona cargarDatos es : ', this.IdPersona);

  // Devuelve SocioEconomico y Apellido y nombre de la persona (Para cargar en el HTML)
  this.usuarioService.dameMensajesPendientes( this.IdPersona , this.desde )
             .subscribe( (resp: any) => {

              console.log('resp en dameMensajesPendientes es : ', resp);

              this.misPedidos = resp[0];
              console.log('this.misPedidos en dameMisPedidos es : ', this.misPedidos);

              // this.mensajesNoLeidos = resp[0][0].mensajesNoLeidos;
              // console.log('this.mensajesNoLeidos en dameMisPedidos es : ', this.mensajesNoLeidos);
            });

  }*/
// ==================================================
//  Cambia el estado del pedido a 'T' : Terminado
// ==================================================

terminarPedido( mp: any ) {

  console.log('mp terminarPedidos es : ', mp);

  this.usuarioService.terminarPedido( mp )
             .subscribe( (resp: any) => {

              console.log('terminarPedido resp : ' , resp);

              if ( resp.message === 'Ok') {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Pedido concluido',
                  showConfirmButton: false,
                  timer: 2000
                });
                this.router.navigate(['personas']);
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: resp.message,
                });
                return;
              }
             });
  }


// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  console.log('Ingreso a cambiarDesde, valor es : ', valor);

  const desde = this.desde + valor;

  /*if ( desde >= this.totalPedidos ) {
    console.log('Entro primer if');
    return;
  }

  if ( desde < 0 ) {
    console.log('Entro seg if');
    return;
  }*/

  this.desde += valor;

  this.cargarMisPedidos();

}

}
