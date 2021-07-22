import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Persona } from '../../models/persona.model';
// import { HttpClientModule } from '@angular/common/http';
// import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../../models/usuario.model';
import { SocioEconomico } from '../../models/socioeconomico.model';



@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  persona: Persona;
  personaValor: string;
  personaId: string;
  IdRol: number;
  token: string;
  usuario = '';
  menu: [];


  constructor(
    public http: HttpClient,
    public router: Router
    ) {
  }

  postFile(fileToUpload: File): Observable<boolean> {

    this.token = localStorage.getItem('token');
    let url = URL_SERVICIOS + '/personas/excel';
    url += '?token=' + this.token;

    const formData: FormData = new FormData();
    formData.append('excel', fileToUpload, fileToUpload.name);
    return this.http
      // .post(url, formData, { headers: 'multipart/form-data' })
      .post(url, formData)
      .map(() => { return true; })
      .catch((e) => { return e.error.mensaje; });
}

// ==================================================
//   Carga el excel y lo envia al back - Peticion PUT al server
// ==================================================
async importarExcel( archivoExcel: File ) {

  try {
    this.token = localStorage.getItem('token');
    let url = URL_SERVICIOS + '/personas/excel';
    url += '?token=' + this.token;
    console.log('El url con el token en persona service importarExcel es : ', url);

    const formData = new FormData();
    formData.append('archivoExcel', archivoExcel.name);

    console.log('form data es : ',formData);

    const respuesta = await fetch( url , {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-token': this.token || ''
      },
      body: formData
    });

    console.log('respuesta data es : ',respuesta);


    const data = await respuesta.json();

    // console.log( 'data es : ',data );

    return 'nombre del archivo';

  } catch(error){
    console.log('eer : ',error);
    return false;
  }




  // console.log('El localStorage.getItem(token) persona service es : ', localStorage.getItem('token'));

  // return this.http.get( url );

}

// ====================================================================================================================
// =========================================== PERSONAS ===================================================================
// ====================================================================================================================

// ==================================================
//        Cargar padron - Peticion GET al server
// ==================================================
cargarPadron( desde: number = 0 , banderaTucuman ) {
  this.token = localStorage.getItem('token');
  let url = URL_SERVICIOS + '/personas/padron/' + desde + '/' + banderaTucuman;
  url += '?token=' + this.token;

  console.log('El url con el token en persona service es : ', url);
  // console.log('El localStorage.getItem(token) persona service es : ', localStorage.getItem('token'));

  return this.http.get( url );

}

// ==================================================
//        Crear Persona
// ==================================================

crearPersona( persona: Persona ) {

  let url = URL_SERVICIOS + '/personas/agregar';

  url += '?token=' + this.token;  // query

  return this.http.post(url , persona );
}

// ==================================================
//        Busca una persona Por DNI
// ==================================================

buscarDNI(desde: number = 0, dni: string , banderaTucuman) {

    let url = URL_SERVICIOS + '/personas/busqueda/' + desde + '/' + dni + '/' + banderaTucuman;
    url += '?token=' + this.token;  // query

    console.log('Url en personas service es : ', url);

    return this.http.get(url)
            .map( (resp: any) => resp[0]);
  }

// ==================================================
//    Busca una persona por Apellido o Nombre
// ==================================================

buscarApellNombr(desde: number = 0, Apellido: string, Nombre: string, banderaTucuman ) {

  let url = URL_SERVICIOS + '/personas/busquedaApellNombr/' + desde + '/' + Apellido + '/' + Nombre + '/' + banderaTucuman;
  url += '?token=' + this.token;  // query

  console.log('Url en personas service es : ', url);

  return this.http.get(url)
          .map( (resp: any) => resp[0]);
}
// ==================================================
// Devuelve los datos de una persona dado un id
// ==================================================

damePersonaPadron( id: string ) {

  let url = URL_SERVICIOS + '/personas/instanciar/' + id;
  url += '?token=' + this.token;  // query

  return this.http.get(url)
          .map( (resp: any) => resp[0]);
}

// ====================================================================================================================
// =========================================== SOCIOECONOMICO ===================================================================
// ====================================================================================================================

// ==================================================
// Obtiene los datos SocioEconomicos de una persona + Apellido y Nombre
// ==================================================

dameSocioEconomico( pIdPersona: string, pIdSocioeconomico: any ) {

  console.log('IDpersona en servicio es : ', pIdPersona);
  console.log('pIdSocioeconomico en servicio es : ', pIdSocioeconomico);
  let url = URL_SERVICIOS + '/personas/socioeconomico/' + pIdPersona + '/' + pIdSocioeconomico;
  url += '?token=' + this.token;  // query

  return this.http.get(url)
          .map( (resp: any) => resp[0]);
}

// ==================================================
//        Editar SocioEconomico
// ==================================================

editarSocioEconomico( socioEconomico: SocioEconomico ) {

  console.log('Entro en editarSocioEconomico en persona service es : ', socioEconomico);

  const id = socioEconomico.IdPersona;

  let url = URL_SERVICIOS + '/personas/socioeconomico/actualizar/' + id;
  url += '?token=' + this.token;  // query


  return this.http.put(url , socioEconomico );
}


// ==================================================
// Carga los datos de localidades,barrios,calles, etc de la BD para poder seleccionar entre
// algunos de ellos en el HTML
// ==================================================

dameDatosFormulario( ) {

  let url = URL_SERVICIOS + '/personas/datosformulario/listar/';
  url += '?token=' + this.token;  // query

  return this.http.get(url)
          .map( (resp: any) => resp);
}

// ==================================================
// Obtiene el historial SocioEconomico de una persona
// ==================================================

dameHistorialSocioeconomico( pDesde: number = 0, pIdPersona: string ) {

  let url = URL_SERVICIOS + '/personas/socioeconomico/historial/listar/' + pDesde + '/' + pIdPersona;
  url += '?token=' + this.token;  // query

  console.log('url dameHistorialSocioeconomico ', url);
  return this.http.get(url)
          .map( (resp: any) => resp);
}

// ====================================================================================================================
// =========================================== DICCIONARIOS ===================================================================
// ====================================================================================================================

// ==================================================
// Obtiene los datos SocioEconomicos de una persona + Apellido y Nombre
// ==================================================

dameLocalidades( ) {

  let url = URL_SERVICIOS + '/personas/localidades/listar/';
  url += '?token=' + this.token;  // query

  return this.http.get(url)
          .map( (resp: any) => resp[0]);
}


// ==================================================
// Obtiene los Barrios de la BD - ELIMINAR, DEBERIA IR EN EL GESTOR
// ==================================================

dameBarrios( ) {

  let url = URL_SERVICIOS + '/personas/barrios/listar/';
  url += '?token=' + this.token;  // query

  return this.http.get(url)
          .map( (resp: any) => resp[0]);
}


// ==================================================
// Obtiene las calles de la BD
// ==================================================

dameCalles( ) {

  let url = URL_SERVICIOS + '/personas/calles/listar/';
  url += '?token=' + this.token;  // query

  return this.http.get(url)
          .map( (resp: any) => resp[0]);
}




}
