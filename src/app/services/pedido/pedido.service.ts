import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Persona } from '../../models/persona.model';
// import { HttpClientModule } from '@angular/common/http';
// import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import Swal from 'sweetalert2';
import { Pedido } from 'src/app/models/pedido.model';
import { Mensaje } from 'src/app/models/mensaje.model';


@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  persona: Persona;
  personaValor: string;
  personaId: string;
  IdRol: number;
  token: string;
  usuario = '';
  menu: [];


  constructor(
    public http: HttpClient,
    public router: Router  ) {
    // console.log('Servicio de persona listo');
    // this.cargarPersonas();
    const token1 = localStorage.getItem('token');
    this.token = token1;

  }
// ====================================================================================================================
// =========================================== CHAT =================================================================
// ====================================================================================================================


// ==================================================
//  Cargar los CHATS de un pedido y setea como 'leido' aquellos que
//  no sean de el y que sean del pedido
// ==================================================

cargarChatPedido( desde: number = 0 , IdUsuario, IdPedido ) {

  console.log('Entro en cargarChatPedido en gest service es IdUsuario: ', IdUsuario);
  console.log('Entro en cargarChatPedido en gest service es IdPedido: ', IdPedido);
  const mensaje = new Mensaje(
    null,
    null,
    IdUsuario,
    IdPedido
  );

  let url = URL_SERVICIOS + '/pedidos/chats/listar/' + desde;

  url += '?token=' + this.token;  // query

  console.log('Mensaje es cargarChatPedido : ', mensaje);
  return this.http.put(url , mensaje );
}

// ====================================================================================================================
// =========================================== PEDIDOS =================================================================
// ====================================================================================================================

// ==================================================
//  Cargar los pedidos de una persona por fecha - Peticion GET al server
// ==================================================
cargarPedidos( desde: number = 0 , idPersona: string) {

  let url = URL_SERVICIOS + '/pedidos/' + desde + '/' + idPersona;
  url += '?token=' + this.token;

  console.log('El url con el token en cargarPedido service es : ', url);

  return this.http.get( url );

}

// ==================================================
//        Crear Pedido
// ==================================================

crearPedido( pedido: Pedido ) {

  let url = URL_SERVICIOS + '/pedidos/nuevo';

  console.log('Pedido en servicePedido es : ', pedido);

  url += '?token=' + this.token;  // query

  return this.http.post(url , pedido );
}

// ==================================================
// Devuelve los tipos de pedido de la BD
// ==================================================

dameTiposPedido( ) {
  console.log('dameTiposPedido en servicePedido entro');
  let url = URL_SERVICIOS + '/pedidos/tiposPedidos/listar/listarTiposPedidos';
  url += '?token=' + this.token;  // query

  return this.http.get(url)
          .map( (resp: any) => resp[0]);
}

// ==================================================
//  Cargar un pedido dado su ID
// ==================================================
cargarPedidoPersona( IdPedido: string) {

  let url = URL_SERVICIOS + '/pedidos/instanciar/dame/' + IdPedido;
  url += '?token=' + this.token;

  console.log('El url con el token en cargarPedidoPersona service es : ', url);

  return this.http.get( url );

}

// ==================================================
//  Agrega un mensaje al chat de el pedido
// ==================================================

agregarMensaje(  mensaje: Mensaje ) {

  console.log('El mensaje agregarMensaje en usuario service es : ', mensaje);

  let url = URL_SERVICIOS + '/pedidos/mensaje/nuevo';

  url += '?token=' + this.token;  // query

  return this.http.post(url , mensaje );
}

}
