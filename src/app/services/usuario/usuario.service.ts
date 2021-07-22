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
// import { Cliente } from 'src/app/models/cliente.model';
import { Usuario } from '../../models/usuario.model';
import { Observable } from 'rxjs/Observable';
import { Pedido } from '../../models/pedido.model';
import { Mensaje } from 'src/app/models/mensaje.model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  persona: Persona;
  personaValor: string;
  IdUsuario: string;
  IdRol: number;
  token: string;
  usuario = '';


  constructor(
    public http: HttpClient,
    public router: Router  ) {
    this.cargarStorage();
    const token1 = localStorage.getItem('token');
    this.token = token1;
    // this.cargarPersonas();

  }

// ====================================================================================================================
// =========================================== LOGUEO =================================================================
// ====================================================================================================================

// ==================================================
//        Logueo de la persona
// ==================================================
login( usuario: Usuario ) {

  const url = URL_SERVICIOS + '/login';

  return this.http.post(url, usuario)
        .map(
          ( resp: any ) => {
          console.log('Resp en login es' , resp);

  // tslint:disable-next-line: align
  if (resp.mensaje === 'Error de credenciales') {
    Swal.fire({
        icon: 'error',
        title: 'Error en el login',
        text:  'Error en el login'
    });
    return false;
  }
          this.IdRol = resp.IdRol;
          this.IdUsuario = resp.IdUsuario;
          console.log('this.IdRol en service.usuario es : ', this.IdRol);
          this.guardarStorage( resp.IdUsuario, resp.token, resp.usuario);
          this.cargarStorage();
          return true;
  });
}

// ==================================================
//        Guarda la info en el localstorage
//  Guarda en el storage la informacion recibida por parametros
// ==================================================
guardarStorage( IdUsuario: string, token: string, usuario: any ) {

  console.log('id es en guardarStorage: ', IdUsuario);
  console.log('token es en guardarStorage: ', token);



  localStorage.setItem('IdUsuario', IdUsuario );
  localStorage.setItem('token', token );
  localStorage.setItem('usuario', usuario );
  // localStorage.setItem('IdRol', IdRol );


  this.token = token;
  this.IdUsuario = IdUsuario;
  this.usuario = usuario;

}

// ==================================================
// Carga la informacion almacenada en el localstorage a la informacion actual para que
// pueda ser accesada desde este servicio
// ==================================================
  cargarStorage() {

    console.log('Entro en cargarStorage');

    // console.log('localStorage.getItem(token) ' , localStorage.getItem('token'));

    if ((localStorage.getItem('token') === 'undefined') || (localStorage.getItem('token') === null)) {
      this.token = '';
      this.persona = null;
      this.IdUsuario = null;
    } else {
      const var1 = localStorage.getItem('token');
      this.token = var1;

      this.usuario = localStorage.getItem('usuario');

      const var3 = localStorage.getItem('IdUsuario');

      this.IdUsuario = var3;
    }

  }
// ==================================================
//        Funcion para comprobar el rol administrador: Idrol 1
// ==================================================
comprobarRol() {
  // this.correoActual = localStorage.getItem('usuario');
  console.log('En UuarioService, this.IdRol es : ', this.IdRol);
  if (this.IdRol === 1) {  // 1: Admin
    console.log('En UuarioService, ERES ADMIN!!!');
    return true;
  } else {
    console.log('En UuarioService, NO ERES ADMIN , se oculta el menu !!!');
    return false;
  }
}

// ==================================================
//        Permite saber si un usuario esta logueado
// ==================================================
estaLogueado() {

  this.token = localStorage.getItem('token');
  if ((this.token === 'undefined') || (this.token === null)) {
    return false;
  } else {
    // this.logout();  // <-- Esto da error
    return( this.token.length > 5) ? true : false;

  }
}

// ==================================================
//        Renueva TOKEN
// ==================================================
  renuevaToken() {

    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;

    return this.http.get( url )
                .map( (resp: any) => {

                  this.token = resp.token;
                  localStorage.setItem('token', this.token );
                  console.log('Token renovado');

                  return true;
                })
                .catch( err => {
                  this.router.navigate(['/login']);
                  Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'No se pudo renovar token',
                    showConfirmButton: false,
                    timer: 2000
                  });
                  // tslint:disable-next-line: deprecation
                  return Observable.throw( err );
                });


  }


// ==================================================
//        Hace el logout del usuario
// ==================================================

logout() {
  this.persona = null;
  this.token = '';
  this.IdUsuario = null;
  this.usuario = null;


  localStorage.removeItem('token');
  localStorage.removeItem('IdUsuario');
  localStorage.removeItem('usuario');



  this.router.navigate(['/login']);
}

// ====================================================================================================================
// ============================= GESTION USUARIOS ===================================================================
// ====================================================================================================================

// ==================================================
//        Cargar usuarios
// ==================================================
cargarUsuarios( desde: number = 0 ) {

  let url = URL_SERVICIOS + '/usuarios/' + desde;
  url += '?token=' + this.token;

  console.log('El url con el token en persona service es : ', url);

  return this.http.get( url );

}

// ==================================================
// Cargar repartidores, los usuarios con IdRol 3
// ==================================================
cargarRepartidores(  ) {

  let url = URL_SERVICIOS + '/usuarios/repartidores/listar';
  url += '?token=' + this.token;

  console.log('El url con el token en persona service es : ', url);

  return this.http.get( url );

}
// ==================================================
//        Crear Usuario
// ==================================================

crearUsuario( usuario: Usuario ) {

  console.log('El usuario crearUsuario en usuario service es : ', usuario);

  let url = URL_SERVICIOS + '/usuarios/nuevo';

  url += '?token=' + this.token;  // query

  return this.http.post(url , usuario );
}

// ==================================================
//        Elimina un usuario
// ==================================================

eliminarUsuario( IdUsuario ) {

  let url = URL_SERVICIOS + '/usuarios/eliminar/' + IdUsuario;

  url += '?token=' + this.token;  // query
  url += '&IdRol=' + this.IdRol;


  return this.http.delete(url );
}

// ==================================================
// Lista los pedidos de un usuario dado su ID.
// Ademas carga la cantidad de mensajes no leidos
// ==================================================

dameMisPedidos( pIdUsuario , pDesde: number = 0 ) {

  let url = URL_SERVICIOS + '/pedidos/repartidor/pedidos/' + pIdUsuario + '/' + pDesde;
  console.log('... url ... ', url);

  url += '?token=' + this.token;  // query
  // url += '&IdRol=' + this.IdRol;


  return this.http.get(url );
}

// ==================================================
// Lista los datos de un usuario
// ==================================================

dameDatosUsuario( pIdUsuario ) {

  let url = URL_SERVICIOS + '/usuarios/usuario/' + pIdUsuario;
  console.log('... url dameDatosUsuario... ', url);

  url += '?token=' + this.token;  // query
  // url += '&IdRol=' + this.IdRol;


  return this.http.get(url );
}
// ==================================================
//  Concluye un pedido dado su ID , cambiando su estado a 'T'
// ==================================================

terminarPedido( mp: any ) {

  console.log('Entro en terminarPedido en persona service es : ', mp);

  const IdPedido = mp.IdPedido;

  let url = URL_SERVICIOS + '/usuarios/pedidos/terminar/' + IdPedido;
  url += '?token=' + this.token;  // query


  return this.http.put(url , mp );
}
// ==================================================
//  Actualiza un pedido asignado a un usuario el mismo
// ==================================================

actualizaPedido( pedido: Pedido ) {

  console.log('Entro en actualizaPedido en persona service es : ', pedido);

  const IdPedido = pedido.IdPedido;

  let url = URL_SERVICIOS + '/usuarios/pedidos/actualizar/' + IdPedido;
  url += '?token=' + this.token;  // query


  return this.http.put(url , pedido );
}
// ==================================================
//        Editar un usuario
// ==================================================

editarUsuario( usuario: Usuario ) {

  console.log('Entro en editarUsuario en usuario service es : ', usuario);

  const IdUsuario = usuario.IdUsuario;

  let url = URL_SERVICIOS + '/usuarios/actualizar/' + IdUsuario;
  url += '?token=' + this.token;  // query


  return this.http.put(url , usuario );
}

// ====================================================================================================================
// ============================= DICCIONARIOS ===================================================================
// ====================================================================================================================

// ==================================================
// Devuelve los roles de la BD
// ==================================================

dameRoles( ) {

  let url = URL_SERVICIOS + '/usuarios/roles/listar';
  url += '?token=' + this.token;  // query

  return this.http.get(url)
          .map( (resp: any) => resp[0]);
}

// ==================================================
// Devuelve los lugares de trabajo de la BD
// ==================================================

dameLugaresTrabajo( ) {

  let url = URL_SERVICIOS + '/usuarios/lugares/listar';
  url += '?token=' + this.token;  // query

  return this.http.get(url)
          .map( (resp: any) => resp[0]);
}

// ==================================================
// Devuelve los pedidos pendientes de la BD, para que el usuario (ADMIN) asigne uno de ellos al personal
// ==================================================

damePedidos( desde: number = 0 ) {

  let url = URL_SERVICIOS + '/usuarios/pedidos/listar/' + desde;
  url += '?token=' + this.token;

  console.log('El url con el token en damePedidos service es : ', url);

  return this.http.get( url );

}

// ==================================================
//  Cargar los mensajes no leidos de un usuario
// ==================================================
dameMensajesPendientes( IdUsuario: number = 0 ) {

  let url = URL_SERVICIOS + '/usuarios/mensajes/' + IdUsuario;
  url += '?token=' + this.token;

  console.log('El url con el token en persona service es : ', url);

  return this.http.get( url );

}

}
