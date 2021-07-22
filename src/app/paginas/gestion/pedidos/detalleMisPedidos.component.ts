import { Component, OnInit } from '@angular/core';
import { PedidoService, UsuarioService } from '../../../services/service.index';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators , FormsModule } from '@angular/forms';
import { Pedido } from 'src/app/models/pedido.model';
import { Mensaje } from 'src/app/models/mensaje.model';
// declare var $ = jquery: any;
declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-detallemismedidos',
  templateUrl: './detalleMisPedidos.component.html',
  styleUrls: ['./../../../app.component.css']
})
export class DetalleMisPedidoComponent implements OnInit {

    cargando = false;
    private date: any;  // id del pedido

    pedidoPersona: any;
    chats: any;
    usuarios: any;

    IdUsuario: any;
    IdPedido: any;
    mensaje: any = '';
    desde = 0;
    elemento: any;

    Apellidos: string;
    Nombres: string;
    Fecha: string;
    Autorizado: string;
    Observaciones: string;
    TipoPedido: string;
    Estado: string;
    forma: FormGroup;


  constructor(
    public pedidoService: PedidoService,
    private activatedRoute: ActivatedRoute,
    public usuariosService: UsuarioService,
    private router: Router
  ) {
   }

  ngOnInit() {
    this.IdUsuario = this.usuariosService.IdUsuario;
    this.cargarPedidoPersona();
    this.cargarChats();
    this.elemento = document.getElementById('elemento');
  }



// ==================================================
//  Carga los datos del pedido
// ==================================================

cargarPedidoPersona() {

  this.date = this.activatedRoute.snapshot.paramMap.get('IdPedido');
  console.log('this.date cargarPedidoPersona es : ', this.date);

  // Devuelve SocioEconomico y Apellido y nombre de la persona (Para cargar en el HTML)
  this.pedidoService.cargarPedidoPersona( this.date )
             .subscribe( (resp: any) => {

              console.log('resp en cargarPedidoPersona es : ', resp);

              this.pedidoPersona = resp[0][0];
              console.log('this.pedidoPersona en cargarPedidoPersona es : ', this.pedidoPersona);
              // console.log('this.SocioEconomico en cargarDatos es : ', this.SocioEconomico.Correo);

              this.Apellidos = this.pedidoPersona.Apellidos;
              this.Nombres =  this.pedidoPersona.Nombres;
              this.Fecha = this.pedidoPersona.Fecha;
              this.Autorizado = this.pedidoPersona.Autorizado;
              this.Estado = this.pedidoPersona.Estado;
              this.TipoPedido = this.pedidoPersona.Pedido;
              this.Observaciones = this.pedidoPersona.Observaciones;

            });

  }

// ==================================================
//  Carga los chats del pedido
// ==================================================

cargarChats() {

  this.date = this.activatedRoute.snapshot.paramMap.get('IdPedido');
  console.log('this.date cargarPedidoPersona es : ', this.date);

  console.log('this.IdUsuario cargarPedidoPersona es : ', this.IdUsuario);
  // Devuelve SocioEconomico y Apellido y nombre de la persona (Para cargar en el HTML)
  this.pedidoService.cargarChatPedido( this.desde, this.IdUsuario , this.date )
             .subscribe( (resp: any) => {

              console.log('resp en cargarChatPedido es : ', resp);

              this.chats = resp[0];
              console.log('this.chats en cargarChatPedido es : ', this.chats);
              // console.log('this.SocioEconomico en cargarDatos es : ', this.SocioEconomico.Correo);

            });

  }

// =================================================
//   Carga un mensaje referido al pedido
// ==================================================
enviar_mensaje() {
  console.log( this.mensaje );

  if ( this.mensaje.length === 0 ) {
    return;
  }

  const mensaje = new Mensaje(
    null,
    this.mensaje,
    this.usuariosService.IdUsuario,
    this.date
  );
  console.log('mensaje armado en estado pedido es : ', this.mensaje);
  this.pedidoService.agregarMensaje( mensaje )
          .subscribe( (resp: any) => {

           console.log('resp en usuarios.component es : ', resp);

             // Desactivado por no tener un ID la tabla Personas de PADRON
           // this.totalPersonas = resp[1][0].maximo;
           // console.log('this.totalPersonas es : ', this.totalPersonas);

           this.usuarios = resp[0];
           console.log('this.usuarios es : ', this.usuarios);

           this.cargarChats();
           this.mensaje = '';
         });


}
}
