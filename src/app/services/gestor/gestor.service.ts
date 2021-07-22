import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Persona } from '../../models/persona.model';

import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Usuario } from '../../models/usuario.model';
import { Localidad } from 'src/app/models/localidad.model';
import { Construccion } from '../../models/construccion.model';
import { Calle } from '../../models/calle.model';
import { Escuela } from '../../models/escuela.model';
import { Inmueble } from '../../models/inmueble.model';
import { LugarTrabajo } from 'src/app/models/lugartrabajo.model';
import { TipoPedido } from '../../models/tipoPedido.model';
import { Vivienda } from '../../models/vivienda.model';
import { Barrio } from '../../models/barrio.model';
import { TipoVivienda } from 'src/app/models/tipovivienda.model';
import { Enfermedad } from 'src/app/models/enfermedad.model';
import { ModuloAlimenticio } from 'src/app/models/moduloAlimanticio.model';


@Injectable({
  providedIn: 'root'
})
export class GestorService {

  persona: Persona;
  personaValor: string;
  personaId: string;
  IdRol: number;
  token: string;
  usuario = '';


  constructor(
    public http: HttpClient,
    public router: Router  ) {
    // this.cargarPersonas();
    const token1 = localStorage.getItem('token');
    this.token = token1;
  }

// *******************************************************************************************************************
// ******************************************** BARRIOS **********************************************************
// *******************************************************************************************************************

// ==================================================
//        Carga un barrio dado su ID
// ==================================================
dameBarrio( IdBarrio ) {

  let url = URL_SERVICIOS + '/gestor/barrios/' + IdBarrio;
  url += '?token=' + this.token;

  console.log('El url con el token en dameBarrio service es : ', url);

  return this.http.get( url );

}
// ==================================================
//    Carga los barrios dados de alta desde la BD
// ==================================================
dameBarriosAlta(  ) {

  let url = URL_SERVICIOS + '/gestor/barrios/listar';
  url += '?token=' + this.token;

  console.log('El url con el token en dameBarrio service es : ', url);

  return this.http.get( url );

}
// ==================================================
//        Cargar barrios paginados y con opcion de incluir bajas
// ==================================================
cargarBarrios( desde: number = 0 , incluyeBajas = 0) {

  let url = URL_SERVICIOS + '/gestor/barrios/' + desde + '/' + incluyeBajas;
  url += '?token=' + this.token;

  console.log('El url con el token en cargarBarrios service es : ', url);

  return this.http.get( url );

}

// ==================================================
//        Crear barrio
// ==================================================

crearBarrio( barrio: Barrio ) {

  let url = URL_SERVICIOS + '/gestor/barrios/nuevo';

  url += '?token=' + this.token;  // query

  return this.http.post(url , barrio );
}
// ==================================================
//        Editar Barrio
// ==================================================

editarBarrio( IdBarrio, barrio: Barrio ) {

  console.log('Entro en editarBarrio en gest service es : ', barrio);

  // const id = socioEconomico.IdPersona;

  let url = URL_SERVICIOS + '/gestor/barrios/actualizar/' + IdBarrio;
  url += '?token=' + this.token;  // query

  return this.http.put(url , barrio );
}
// ==================================================
//        Elimina un barrio
// ==================================================

eliminarBarrio( IdBarrio ) {

  let url = URL_SERVICIOS + '/gestor/barrios/eliminar/' + IdBarrio;

  url += '?token=' + this.token;  // query
  url += '&IdRol=' + this.IdRol;


  return this.http.delete(url );
}
// *******************************************************************************************************************
// ******************************************** ENFERMEDADES **********************************************************
// *******************************************************************************************************************

// ==================================================
//  Carga las enfermedades dadas de alta de la BD
// ==================================================
dameTodasEnfermedades( ) {

  let url = URL_SERVICIOS + '/gestor/enfermedades/listar';
  url += '?token=' + this.token;

  console.log('El url con el token en dameTodasEnfermedadesa service es : ', url);

  return this.http.get( url );

}

// ==================================================
//        Carga una enfermedad dado su ID
// ==================================================
dameEnfermedad( IdEnfermedad ) {

  let url = URL_SERVICIOS + '/gestor/enfermedades/' + IdEnfermedad;
  url += '?token=' + this.token;

  console.log('El url con el token en dameEnfermedad service es : ', url);

  return this.http.get( url );

}
// ==================================================
//  Cargar las enfermedades paginados y con opcion de incluir bajas
// ==================================================
cargarEnfermedades( desde: number = 0 , incluyeBajas = 0) {

  let url = URL_SERVICIOS + '/gestor/enfermedades/' + desde + '/' + incluyeBajas;
  url += '?token=' + this.token;

  console.log('El url con el token en cargarEnfermedades service es : ', url);

  return this.http.get( url );

}

// ==================================================
//        Crear enfermedad
// ==================================================

crearEnfermedad( enfermedad: Enfermedad ) {

  let url = URL_SERVICIOS + '/gestor/enfermedades/nuevo';

  url += '?token=' + this.token;  // query

  return this.http.post(url , enfermedad );
}
// ==================================================
//        Editar Enfermedad
// ==================================================

editarEnfermedad( IdEnfermedad, enfermedad: Enfermedad ) {

  console.log('Entro en editarEnfermedad en gest service es : ', enfermedad);

  // const id = socioEconomico.IdPersona;

  let url = URL_SERVICIOS + '/gestor/enfermedades/actualizar/' + IdEnfermedad;
  url += '?token=' + this.token;  // query

  return this.http.put(url , enfermedad );
}
// ==================================================
//        Elimina una enfermedad
// ==================================================

eliminarEnfermedad( IdEnfermedad ) {

  let url = URL_SERVICIOS + '/gestor/enfermedades/eliminar/' + IdEnfermedad;

  url += '?token=' + this.token;  // query
  url += '&IdRol=' + this.IdRol;


  return this.http.delete(url );
}
// *******************************************************************************************************************
// ******************************************** LOCALIDADES **********************************************************
// *******************************************************************************************************************
// ==================================================
//        Carga una dado su ID
// ==================================================
dameLocalidad( IdLocalidad ) {

  let url = URL_SERVICIOS + '/gestor/localidad/' + IdLocalidad;
  url += '?token=' + this.token;

  console.log('El url con el token en dameLocalidad service es : ', url);

  return this.http.get( url );

}

// ==================================================
//        Cargar localidades
// ==================================================
cargarLocalidades( desde: number = 0 , incluyeBajas = 0) {

  let url = URL_SERVICIOS + '/gestor/localidades/' + desde + '/' + incluyeBajas;
  url += '?token=' + this.token;

  console.log('El url con el token en cargarLocalidades service es : ', url);

  return this.http.get( url );

}
// ==================================================
//   Carga todas las localidades dadas de alta de la BD
// ==================================================
cargarTodasLocalidades(  ) {

  let url = URL_SERVICIOS + '/gestor/localidades';
  url += '?token=' + this.token;

  console.log('El url con el token en cargarLocalidades service es : ', url);

  return this.http.get( url );

}

// ==================================================
//        Crear Localidad
// ==================================================

crearLocalidad( localidad: Localidad ) {

  let url = URL_SERVICIOS + '/gestor/localidades/nuevo';

  url += '?token=' + this.token;  // query

  return this.http.post(url , localidad );
}
// ==================================================
//        Editar Localidad
// ==================================================

editarLocalidad( IdLocalidad, localidad: Localidad ) {

  console.log('Entro en editarlocalidad en gest service es : ', localidad);

  // const id = socioEconomico.IdPersona;

  let url = URL_SERVICIOS + '/gestor/localidades/actualizar/' + IdLocalidad;
  url += '?token=' + this.token;  // query


  return this.http.put(url , localidad );
}
// ==================================================
//        Elimina una localidad
// ==================================================

eliminarLocalidad( IdLocalidad ) {

  let url = URL_SERVICIOS + '/gestor/localidades/eliminar/' + IdLocalidad;

  url += '?token=' + this.token;  // query
  url += '&IdRol=' + this.IdRol;


  return this.http.delete(url );
}

// *******************************************************************************************************************
// ******************************************** CALLES **********************************************************
// *******************************************************************************************************************

// ==================================================
//        Cargar calles
// ==================================================
cargarCalles( desde: number = 0, incluyeBajas: number = 0 ) {

  let url = URL_SERVICIOS + '/gestor/calles/' + desde + '/' + incluyeBajas;
  url += '?token=' + this.token;

  console.log('El url con el token en cargarCalles service es : ', url);

  return this.http.get( url );

}
// ==================================================
//        Cargar todas las calles dadas de alta
// ==================================================
cargarTodasCalles(  ) {

  let url = URL_SERVICIOS + '/gestor/calles';
  url += '?token=' + this.token;

  console.log('El url con el token en cargarTodasCalles service es : ', url);

  return this.http.get( url );

}
// ==================================================
//        Crear calle
// ==================================================

crearCalle( calle: Calle ) {

  let url = URL_SERVICIOS + '/gestor/calles/nuevo';

  url += '?token=' + this.token;  // query

  return this.http.post(url , calle );
}
// ==================================================
//        Editar Calle
// ==================================================

editarCalle( IdCalle, calle: Calle ) {

  console.log('Entro en editarlocalidad en gest service es : ', calle);

  // const id = socioEconomico.IdPersona;

  let url = URL_SERVICIOS + '/gestor/calles/actualizar/' + IdCalle;
  url += '?token=' + this.token;  // query


  return this.http.put(url , calle );
}
// ==================================================
//        Elimina una calle
// ==================================================

eliminarCalle( IdCalle ) {

  let url = URL_SERVICIOS + '/gestor/calles/eliminar/' + IdCalle;

  url += '?token=' + this.token;  // query
  url += '&IdRol=' + this.IdRol;


  return this.http.delete(url );
}

// ==================================================
//        Carga una calle dado su ID
// ==================================================
dameCalle( IdCalle ) {

  let url = URL_SERVICIOS + '/gestor/calles/' + IdCalle;
  url += '?token=' + this.token;

  console.log('El url con el token en dameLocalidad service es : ', url);

  return this.http.get( url );

}
// *******************************************************************************************************************
// ******************************************** CONSTRUCCIONES **********************************************************
// *******************************************************************************************************************

// ==================================================
//        Cargar construcciones
// ==================================================
cargarConstrucciones( desde: number = 0 , incluyeBajas: any) {

  let url = URL_SERVICIOS + '/gestor/construcciones/' + desde + '/' + incluyeBajas;
  url += '?token=' + this.token;

  console.log('El url con el token en cargarconstruccionesservice es : ', url);

  return this.http.get( url );

}

// ==================================================
//        Crear construccion
// ==================================================

crearConstruccion( construccion: Construccion ) {

  let url = URL_SERVICIOS + '/gestor/construcciones/nuevo';

  url += '?token=' + this.token;  // query

  return this.http.post(url , construccion );
}

// ==================================================
//        Editar construccion
// ==================================================

editarConstruccion( IdConstruccion, construccion: Construccion ) {

  console.log('Entro en editarConstruccion en gest service es : ', construccion);

  // const id = socioEconomico.IdPersona;

  let url = URL_SERVICIOS + '/gestor/construccion/actualizar/' + IdConstruccion;
  url += '?token=' + this.token;  // query


  return this.http.put(url , construccion );
}
// ==================================================
//        Elimina una construccion
// ==================================================

eliminarConstruccion( IdConstruccion ) {

  let url = URL_SERVICIOS + '/gestor/construccion/eliminar/' + IdConstruccion;

  url += '?token=' + this.token;  // query
  url += '&IdRol=' + this.IdRol;


  return this.http.delete(url );
}

// ==================================================
//        Carga una construccion dado su ID
// ==================================================
dameConstruccion( IdConstruccion ) {

  let url = URL_SERVICIOS + '/gestor/construccion/' + IdConstruccion;
  url += '?token=' + this.token;

  console.log('El url con el token en dameConstruccion service es : ', url);

  return this.http.get( url );

}
// *******************************************************************************************************************
// ******************************************** ESCUELAS **********************************************************
// *******************************************************************************************************************

// ==================================================
//        Cargar escuelas
// ==================================================
cargarEscuelas( desde: number = 0 , incluyeBajas: number ) {

  let url = URL_SERVICIOS + '/gestor/escuelas/' + desde + '/' + incluyeBajas;
  url += '?token=' + this.token;

  console.log('El url con el token en cargarEscuelas service es : ', url);

  return this.http.get( url );

}
// ==================================================
//        Cargar todas las escuelas dadas de alta de la BD
// ==================================================
cargarTotalEscuelas(  ) {

  let url = URL_SERVICIOS + '/gestor/escuelas';
  url += '?token=' + this.token;

  console.log('El url con el token en cargarTotalEscuelas service es : ', url);

  return this.http.get( url );

}

// ==================================================
//        Crear escuela
// ==================================================

crearEscuela( escuela: Escuela ) {

  let url = URL_SERVICIOS + '/gestor/escuelas/nuevo';

  url += '?token=' + this.token;  // query

  return this.http.post(url , escuela );
}
// ==================================================
//        Editar escuela
// ==================================================

editarEscuela( IdEscuela, escuela: Escuela ) {

  console.log('Entro en editarEscuela en gest service es : ', escuela);

  // const id = socioEconomico.IdPersona;

  let url = URL_SERVICIOS + '/gestor/escuela/actualizar/' + IdEscuela;
  url += '?token=' + this.token;  // query


  return this.http.put(url , escuela );
}
// ==================================================
//        Elimina una escuela
// ==================================================

eliminarEscuela( IdEscuela ) {

  let url = URL_SERVICIOS + '/gestor/escuela/eliminar/' + IdEscuela;

  url += '?token=' + this.token;  // query
  url += '&IdRol=' + this.IdRol;


  return this.http.delete(url );
}

// ==================================================
//        Carga una escuela dado su ID
// ==================================================
dameEscuela( IdEscuela ) {

  let url = URL_SERVICIOS + '/gestor/escuela/' + IdEscuela;
  url += '?token=' + this.token;

  console.log('El url con el token en dameEscuela service es : ', url);

  return this.http.get( url );

}
// ====================================================================================================================
// =========================================== MODULOS ALIMENTICIOS =================================================================
// ====================================================================================================================

// ==================================================
//   Carga los modulos alimenticios
// ==================================================
cargarModulosAlimenticios( desde: number = 0 , incluyeBajas ) {

  let url = URL_SERVICIOS + '/gestor/modulosalimenticios/' + desde + '/' + incluyeBajas;
  url += '?token=' + this.token;

  console.log('El url con el token en cargaLugaresTrabajo service es : ', url);
  return this.http.get( url );

}
// ==================================================
//   Carga los modulos alimenticios dados de alta
// ==================================================
cargarModulosAlimenticiosAlta(  ) {

let url = URL_SERVICIOS + '/gestor/modulosalimenticios/listar';
url += '?token=' + this.token;

console.log('El url con el token en cargarModulosAlta service es : ', url);
return this.http.get( url );

}
// ==================================================
//        Crear Modulo
// ==================================================

crearModuloAlimenticio( modulo: ModuloAlimenticio ) {

let url = URL_SERVICIOS + '/gestor/modulosalimenticios/nuevo';

console.log('Pedido en servicePedido es : ', modulo);

url += '?token=' + this.token;  // query

return this.http.post(url , modulo );
}
// ==================================================
//  Da de baja un modulo alimenticio
// ==================================================

eliminarModuloAlimenticio( IdModulo ) {

  let url = URL_SERVICIOS + '/gestor/modulosalimenticios/eliminar/' + IdModulo;

  url += '?token=' + this.token;  // query
//     url += '&IdRol=' + this.IdRol;

  return this.http.delete(url );
}

// ==================================================
//  Instancia un modulo alimenticio
// ==================================================

dameModuloAlimenticio( IdModuloA ) {

  let url = URL_SERVICIOS + '/gestor/modulosalimenticios/' + IdModuloA;
  url += '?token=' + this.token;

  console.log('El url con el token en dameInmueble service es : ', url);

  return this.http.get( url );
}
// ==================================================
//        Actualiza un modulo alimenticio
// ==================================================

editarModuloAlimenticio( IdModuloAlimenticio, ModuloA: ModuloAlimenticio ) {

  console.log('Entro en editarModuloAlimenticio en ModuloA es : ', ModuloA);

  // const id = socioEconomico.IdPersona;

  let url = URL_SERVICIOS + '/gestor/modulosalimenticios/actualizar/' + IdModuloAlimenticio;
  url += '?token=' + this.token;  // query


  return this.http.put(url , ModuloA );
}
// *******************************************************************************************************************
// ******************************************** INMUEBLES **********************************************************
// *******************************************************************************************************************

// ==================================================
//        Cargar inmuebles
// ==================================================
cargarInmuebles( desde: number = 0 , incluyeBajas = 0) {

  let url = URL_SERVICIOS + '/gestor/inmuebles/' + desde + '/' + incluyeBajas;
  url += '?token=' + this.token;

  console.log('El url con el token en cargarInmuebles service es : ', url);

  return this.http.get( url );

}

// ==================================================
//        Crear inmueble
// ==================================================

crearInmueble( inmueble: Inmueble ) {

  let url = URL_SERVICIOS + '/gestor/inmuebles/nuevo';

  url += '?token=' + this.token;  // query

  return this.http.post(url , inmueble );
}
// ==================================================
//        Editar inmueble
// ==================================================

editarInmueble( IdInmueble, inmueble: Inmueble ) {

  console.log('Entro en editarInmueble en gest service es : ', inmueble);

  // const id = socioEconomico.IdPersona;

  let url = URL_SERVICIOS + '/gestor/inmueble/actualizar/' + IdInmueble;
  url += '?token=' + this.token;  // query


  return this.http.put(url , inmueble );
}
// ==================================================
//        Elimina una inmueble
// ==================================================

eliminarInmueble( IdInmueble ) {

  let url = URL_SERVICIOS + '/gestor/inmueble/eliminar/' + IdInmueble;

  url += '?token=' + this.token;  // query
  url += '&IdRol=' + this.IdRol;


  return this.http.delete(url );
}

// ==================================================
//        Carga un inmueble dado su ID
// ==================================================
dameInmueble( IdInmueble ) {

  let url = URL_SERVICIOS + '/gestor/inmueble/' + IdInmueble;
  url += '?token=' + this.token;

  console.log('El url con el token en dameInmueble service es : ', url);

  return this.http.get( url );

}
// *******************************************************************************************************************
// ******************************************** LUGARES DE TRABAJO ***************************************************
// *******************************************************************************************************************

// ==================================================
//        Cargar lugares de trabajo
// ==================================================
cargarLugaresTrabajos( desde: number = 0 , incluyeBajas ) {

  let url = URL_SERVICIOS + '/gestor/lugarestrabajo/' + desde + '/' + incluyeBajas;
  url += '?token=' + this.token;

  console.log('El url con el token en cargaLugaresTrabajo service es : ', url);

  return this.http.get( url );

}
// ==================================================
//   Carga todos los lugares de trabajo dados de alta desde la BD
// ==================================================
cargarTodosLugaresTrabajo(  ) {

  let url = URL_SERVICIOS + '/gestor/lugarestrabajo';
  url += '?token=' + this.token;

  console.log('El url con el token en cargarTodosLugaresTrabajo service es : ', url);

  return this.http.get( url );

}

// ==================================================
//        Crear LugaresTrabajo
// ==================================================

crearLugarTrabajo( lugartrabajo: LugarTrabajo ) {

  let url = URL_SERVICIOS + '/gestor/lugarestrabajo/nuevo';

  url += '?token=' + this.token;  // query

  return this.http.post(url , lugartrabajo );
}
// ==================================================
//        Editar Lugares de trabajo
// ==================================================

editarLugaresTrabajo( IdLugarTrabajo, lugarTrabajo: LugarTrabajo ) {

  console.log('Entro en editarLugaresTrabajo en gest service es : ', lugarTrabajo);

  // const id = socioEconomico.IdPersona;

  let url = URL_SERVICIOS + '/gestor/lugartrabajo/actualizar/' + IdLugarTrabajo;
  url += '?token=' + this.token;  // query


  return this.http.put(url , lugarTrabajo );
}
// ==================================================
//        Elimina un lugar de trabajo
// ==================================================

eliminarLugarTrabajo( IdLugarTrabajo ) {

  let url = URL_SERVICIOS + '/gestor/lugartrabajo/eliminar/' + IdLugarTrabajo;

  url += '?token=' + this.token;  // query
  url += '&IdRol=' + this.IdRol;


  return this.http.delete(url );
}

// ==================================================
//        Carga un lugart de trabajo dado su ID
// ==================================================
dameLugarTrabajo( IdLugarTrabajo ) {

  let url = URL_SERVICIOS + '/gestor/lugartrabajo/' + IdLugarTrabajo;
  url += '?token=' + this.token;

  console.log('El url con el token en dameLugarTrabajo service es : ', url);

  return this.http.get( url );

}
// *******************************************************************************************************************
// ******************************************** TIPOS DE PEDIDO ***************************************************
// *******************************************************************************************************************

// ==================================================
//        Cargar lugares de trabajo
// ==================================================
cargaTiposPedido( desde: number = 0 ) {

  let url = URL_SERVICIOS + '/gestor/tipospedidos/' + desde;
  url += '?token=' + this.token;

  console.log('El url con el token en cargaTiposPedido service es : ', url);

  return this.http.get( url );

}

// ==================================================
//        Crear TiposPedido
// ==================================================

crearTipoPedido( tp: TipoPedido ) {

  let url = URL_SERVICIOS + '/gestor/tipospedidos/nuevo';

  url += '?token=' + this.token;  // query

  return this.http.post(url , tp );
}
// ==================================================
//        Editar TiposPedido
// ==================================================

editarTipoPedido( IdTipoPedido, tipoPedido: TipoPedido ) {

  console.log('Entro en editarTipoPedido en gest service es : ', tipoPedido);

  // const id = socioEconomico.IdPersona;

  let url = URL_SERVICIOS + '/gestor/tipopedido/actualizar/' + IdTipoPedido;
  url += '?token=' + this.token;  // query


  return this.http.put(url , tipoPedido );
}
// ==================================================
//        Elimina un tipo de pedido
// ==================================================

eliminarTipoPedido( IdTipoPedido ) {

  let url = URL_SERVICIOS + '/gestor/tipopedido/eliminar/' + IdTipoPedido;

  url += '?token=' + this.token;  // query
  url += '&IdRol=' + this.IdRol;


  return this.http.delete(url );
}

// ==================================================
//        Carga un tipo de pedido dado su ID
// ==================================================
dameTipoPedido( IdTipoPedido ) {

  let url = URL_SERVICIOS + '/gestor/tipopedido/' + IdTipoPedido;
  url += '?token=' + this.token;

  console.log('El url con el token en dameLugarTipoPedido service es : ', url);

  return this.http.get( url );

}
// *******************************************************************************************************************
// ******************************************** VIVIENDAS *********************************************************
// *******************************************************************************************************************

// ==================================================
//        Cargar viviendas
// ==================================================
cargarViviendas( desde: number = 0 , incluyeBajas: number = 0) {

  let url = URL_SERVICIOS + '/gestor/viviendas/' + desde + '/' + incluyeBajas;
  url += '?token=' + this.token;

  console.log('El url con el token en cargarViviendas service es : ', url);

  return this.http.get( url );

}

// ==================================================
//        Crear Vivienda
// ==================================================

crearVivienda( vivienda: Vivienda ) {

  let url = URL_SERVICIOS + '/gestor/viviendas/nuevo';

  url += '?token=' + this.token;  // query

  return this.http.post(url , vivienda );
}
// ==================================================
//        Editar Vivienda
// ==================================================

editarVivienda( IdVivienda, vivienda: Vivienda ) {

  console.log('Entro en editarVivienda en gest service es : ', vivienda);

  // const id = socioEconomico.IdPersona;

  let url = URL_SERVICIOS + '/gestor/vivienda/actualizar/' + IdVivienda;
  url += '?token=' + this.token;  // query


  return this.http.put(url , vivienda );
}
// ==================================================
//        Elimina una vivienda
// ==================================================

eliminarVivienda( IdVivienda ) {

  let url = URL_SERVICIOS + '/gestor/vivienda/eliminar/' + IdVivienda;

  url += '?token=' + this.token;  // query
  url += '&IdRol=' + this.IdRol;


  return this.http.delete(url );
}

// ==================================================
//        Carga una vivienda dado su ID
// ==================================================
dameVivienda( IdVivienda ) {

  let url = URL_SERVICIOS + '/gestor/vivienda/' + IdVivienda;
  url += '?token=' + this.token;

  console.log('El url con el token en dameVivienda service es : ', url);

  return this.http.get( url );

}

// *******************************************************************************************************************
// ******************************************** TIPO DE VIVIENDA *****************************************************
// *******************************************************************************************************************

// ==================================================
//        Carga un tipo de vivienda dado su ID
// ==================================================
dameTipovivienda( IdTipoVivienda ) {

  let url = URL_SERVICIOS + '/gestor/tiposviviendas/' + IdTipoVivienda;
  url += '?token=' + this.token;

  console.log('El url con el token en dameTipovivienda service es : ', url);

  return this.http.get( url );

}

// ==================================================
//        Cargar los tipos de vivienda
// ==================================================
cargarTiposViviendas( desde: number = 0 , incluyeBajas = 0) {

  let url = URL_SERVICIOS + '/gestor/tiposviviendas/' + desde + '/' + incluyeBajas;
  url += '?token=' + this.token;

  console.log('El url con el token en cargarTiposViviendas service es : ', url);

  return this.http.get( url );

}

// ==================================================
//        Crear un tipo de vivienda
// ==================================================

crearTipoVivienda( tipovivienda: TipoVivienda ) {

  let url = URL_SERVICIOS + '/gestor/tiposviviendas/nuevo';

  url += '?token=' + this.token;  // query

  return this.http.post(url , tipovivienda );
}
// ==================================================
//        Editar Tipo de vivienda
// ==================================================

editarTipoVivienda( IdTipoVivienda, tipovivienda: TipoVivienda ) {

  console.log('Entro en editarTipoVivienda en gest service es : ', tipovivienda);

  // const id = socioEconomico.IdPersona;

  let url = URL_SERVICIOS + '/gestor/tiposviviendas/actualizar/' + IdTipoVivienda;
  url += '?token=' + this.token;  // query

  return this.http.put(url , tipovivienda );
}
// ==================================================
//        Elimina un tipo de vivienda
// ==================================================

eliminarTipoVivienda( IdTipoVivienda ) {

  let url = URL_SERVICIOS + '/gestor/tiposviviendas/eliminar/' + IdTipoVivienda;

  url += '?token=' + this.token;  // query
  url += '&IdRol=' + this.IdRol;


  return this.http.delete(url );
}
}
