import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import Swal from 'sweetalert2';
import { ModuloAlimenticio } from '../../models/moduloAlimanticio.model';
import { Grupo } from '../../models/grupo.model';
import { Entrega } from 'src/app/models/entrega.model';


@Injectable({
  providedIn: 'root'
})
export class ControlService {

IdGrupoFamiliarActual: any;
token: any;
cuerpo: any;


  constructor(
    public http: HttpClient,
    public router: Router  ) {
    const token1 = localStorage.getItem('token');
    this.token = token1;
  }
// ====================================================================================================================
// =========================================== ENTREGAS =================================================================
// ====================================================================================================================
// ==================================================
//   Carga las entregas
// ==================================================
cargarEntregas( desde: number = 0 , filtroDias = -1 , filtroBarrio = -1) {

  let url = URL_SERVICIOS + '/control/entregas/' + desde + '/' + filtroDias + '/' + filtroBarrio;
  url += '?token=' + this.token;

  console.log('El url con el token en cargarEntregas service es : ', url);
  return this.http.get( url );

}
// ==================================================
//   Carga los detalles de una entrega dado su ID
// ==================================================
cargarEntrega( IdPersona ) {

  let url = URL_SERVICIOS + '/control/entregas/detalles/listar/entrega/' + IdPersona;
  url += '?token=' + this.token;

  console.log('El url con el token en cargarEntrega service es : ', url);
  return this.http.get( url );

}
// ==================================================
//    Nueva entrega
// ==================================================

nuevaEntrega( entrega: Entrega , telefono: string, hisopado: string , positivo: string , asistencia: string, aisladoPor: string) {

  let url = URL_SERVICIOS + '/control/entregas/nuevo';

  this.cuerpo = [
    entrega,
    telefono,
    hisopado,
    positivo,
    asistencia,
    aisladoPor
  ];

  console.log('this.cuerpo es : ', this.cuerpo);

  url += '?token=' + this.token;  // query

  return this.http.post(url , this.cuerpo );
}
// ==================================================
//  Da de baja el pedido por incumplimiento
// ==================================================

incumplimiento( IdPersona , IdUsuario ) {

  console.log('Entro en incumplimiento en IdPersona es : ', IdPersona);

  // const id = socioEconomico.IdPersona;

  let url = URL_SERVICIOS + '/control/entregas/incumplimiento/persona/cancelar/' + IdPersona + '/' + IdUsuario;
  url += '?token=' + this.token;  // query

  return this.http.get(url );
}
// ==================================================
//   Concluye la proxima entrega
// ==================================================

concluirEntrega( IdEntrega, IdUsuario) {

  console.log('Entro en editarTipoVivienda en gest service es : ', IdEntrega);

  // const id = socioEconomico.IdPersona;

  let url = URL_SERVICIOS + '/control/entregas/concluir/entrega/' + IdEntrega + '/' + IdUsuario;
  url += '?token=' + this.token;  // query

  return this.http.get(url );
}
// ====================================================================================================================
// =========================================== CENSO - GRUPO FAMILIAR =================================================
// ====================================================================================================================

// ==================================================
//        Crear Grupo Familiar
// ==================================================

crearGrupo( grupo: Grupo ) {

    let url = URL_SERVICIOS + '/control/censo/grupo/nuevo';

    console.log('Censo en crearGrupo es : ', grupo);

    url += '?token=' + this.token;  // query

    return this.http.post(url , grupo );
  }

// ==================================================
//   Da de alta una persona en un grupo familiar (previa validacion)
// ==================================================

nuevaPersonaGrupo( datosCenso: any ) {

  let url = URL_SERVICIOS + '/control/censo/grupo/nuevo/persona/' + this.IdGrupoFamiliarActual;

  console.log('Censo en nuevaPersonaGrupo es : ', datosCenso);

  url += '?token=' + this.token;  // query

  return this.http.post(url , datosCenso );
}
// ==================================================
//  Cargar los grupos familiares
// ==================================================
cargarGruposFamiliares( desde: number = 0  ) {

  let url = URL_SERVICIOS + '/control/censo/grupo/listar/' + desde;
  url += '?token=' + this.token;

  console.log('El url con el token en cargaLugaresTrabajo service es : ', url);
  return this.http.get( url );

}

// ==================================================
//  Cargar los grupos familiares en los cuales al menos un
//  integrante alla dado positivo
// ==================================================
cargarGruposPositivo( desde: number = 0  ) {

  let url = URL_SERVICIOS + '/control/censo/grupo/listar/positivo/' + desde;
  url += '?token=' + this.token;

  console.log('El url con el token en cargarGrupoPositivo service es : ', url);
  return this.http.get( url );

}
// ==================================================
//  Cargar los grupos familiares
// ==================================================
cargarDatosGrupoFamiliar( IdGrupoFamiliar  ) {

  let url = URL_SERVICIOS + '/control/censo/grupo/' + IdGrupoFamiliar;
  url += '?token=' + this.token;

  console.log('El url con el token en cargaLugaresTrabajo service es : ', url);
  return this.http.get( url );

}
// ====================================================================================================================
// =========================================== VALIDACION DE DATOS =================================================
// ====================================================================================================================
// ==================================================
//    Validar datos
// ==================================================

validarDatos( DNI: string ) {

  let url = URL_SERVICIOS + '/control/censo/grupo/validar/' + DNI ;

  console.log('DNI en validarDatos es : ', DNI);

  url += '?token=' + this.token;  // query

  return this.http.get(url );
}

}
