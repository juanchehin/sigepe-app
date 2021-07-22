import { Component, OnInit } from '@angular/core';
import { PedidoService, UsuarioService } from '../../../services/service.index';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators , FormsModule } from '@angular/forms';
import { Pedido } from 'src/app/models/pedido.model';
import { Mensaje } from 'src/app/models/mensaje.model';

declare var swal: any;

@Component({
  selector: 'app-estadopedido',
  templateUrl: './estadopedido.component.html',
  styleUrls: ['./../../../app.component.css']
})
export class EstadoPedidoComponent implements OnInit {

    cargando = false;
    private date: any;  // id del pedido

    pedidoPersona: any;
    chats: any;
    usuarios: any;

    IdUsuario: any;
    IdPedido: any;
    mensaje: any = '';
    desde = 0;
    banderaUsuario = false;

    Apellidos: string;
    Nombres: string;
    Fecha: string;
    Autorizado: string;
    Observaciones: string;
    Usuario = '** Sin Asignar **';
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
    this.cargarUsuarios();
    this.cargarChats();

    this.forma = new FormGroup({
      IdUsuario: new FormControl(null )
    });
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
              if ( this.pedidoPersona.Usuario !== null) {
                  console.log('ENtro ');
                  this.Usuario = this.pedidoPersona.Usuario;
              }
              this.TipoPedido = this.pedidoPersona.Pedido;
              this.Observaciones = this.pedidoPersona.Observaciones;

            });

  }
// ==================================================
// Carga de usuarios del sistema
// ==================================================

cargarUsuarios() {
  // console.log('seleccionado  es : ', this.estadoSeleccionado );
  this.cargando = true;

  // Con paramtro '-1- cargo todo el listado de usuarios
  this.usuariosService.cargarRepartidores( )
             .subscribe( (resp: any) => {

              console.log('resp en usuarios.component es : ', resp);

                // Desactivado por no tener un ID la tabla Personas de PADRON
              // this.totalPersonas = resp[1][0].maximo;
              // console.log('this.totalPersonas es : ', this.totalPersonas);

              this.usuarios = resp[0];
              console.log('this.usuarios es : ', this.usuarios);

              this.cargando = false;

            });

}


// =================================================
//   Actualiza el pedido asignando el pedido a un usuario del listado
// ==================================================

actualizaPedido( ) {
  console.log('Formulario valido y actualiza cliente ingreso');

  console.log('this.forma actualizaPedido ES  : ', this.forma);
  // console.log('this.Correo actualizar : ', this.Correo);


  const pedido = new Pedido(
    this.date,
    null,
    null,
    this.forma.value.IdUsuario = this.forma.value.IdUsuario || this.IdUsuario,
    null,
    null,
    null,
    null
  );

  console.log('actualizaPedido armado en actualizaPedido.component es : ', pedido);


  this.usuariosService.actualizaPedido( pedido )
             .subscribe( (resp: any) => {

              console.log('actualizaPedido resp : ' , resp);

              if ( resp.message === 'Ok') {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Pedido asignado',
                  showConfirmButton: false,
                  timer: 2000
                });
                this.router.navigate(['gestion/pedidos']);
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error al asignar',
                  text: resp.message,
                });
                return;
              }
             });
}
// ==================================================
//  Carga los chats del pedido y setea todos como leido
// ==================================================

cargarChats() {

  this.date = this.activatedRoute.snapshot.paramMap.get('IdPedido');
  console.log('this.date cargarPedidoPersona es : ', this.date);
  console.log('this.IdUsuario cargarPedidoPersona es : ', this.IdUsuario);
  this.pedidoService.cargarChatPedido( this.desde, this.IdUsuario, this.date )
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

           this.cargando = false;
           this.cargarChats();
           this.mensaje = '';
         });


}

// ==================================================
// Modifica la bandera de usuario
// ==================================================

modificaBanderaUsuario() {

  if (this.banderaUsuario === false) {
  this.banderaUsuario = true;
  } else {
   this.banderaUsuario = false;
  }
}
}
