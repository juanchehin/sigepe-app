import { Component, OnInit } from '@angular/core';
import { Persona } from '../../models/persona.model';
import { SocioEconomico } from '../../models/socioeconomico.model';
import { PersonaService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


declare var swal: any;

@Component({
  selector: 'app-socioeconomico',
  templateUrl: './socioeconomico.component.html',
  styles: []
})
export class SocioEconomicoComponent implements OnInit {

    cargando = false;
    date: any;  // id de la persona
    SocioEconomico: any;
    localidades: any;
    pisos: any;
    modulos: any;
    situacionesInmuebles: any;
    banos: any;
    calles: any;
    localescomerciales: any;
    tiposVivienda: any;
    problSociales: any;
    techos: any;
    escuelas: any;
    datosPersona: any;
    barrios: any;
    datosFormulario: any;
    forma: FormGroup;

    Apellidos: string;
    Nombres: string;

    Barrio: any;
    Calle: any;
    NroCalle: any;
    Localidad: any;
    Vinculo = null;
    FechaNac: any;
    EstudiosCursados = null;
    Escuela: any;
    Profesion = null;
    SituacionLaboral = null;
    ObraSocial = null;
    ProblSocial: any;
    TipoDiscapacidad = null;
    Vivienda: any;
    Modulo: any;
    Habitaciones = null;
    Techo: any;
    Piso: any;
    Bano: any;
    AguaCte = null;
    GasNatural = null;
    RedCloacal = null;
    ContratoGas = null;
    SituacionInmueble: any;
    LocalComercial: any;
    Construccion: any;
    Observaciones = null;
    MetrosConstruccion = null;
    TipoRubro = null;
    NombreLocalComercial = null;
    NroLote = null;
    NroPadron = null;
    TipoCasa = null;
    // IdSocioEconomico: any;

    IdBarrio: any;
    IdLocalidad: any;
    IdEscuela: any;
    IdProblSocial: any;
    IdTipoVivienda: any;
    IdTipoModulo: any;
    IdTipoTecho: any;
    IdTipoPiso: any;
    IdTipoBano: any;
    IdSituacionInmueble: any;
    IdLocalComercial: any;
    IdCalle: any;
    IdTipoCasa: any;
    IdConstruccion: any;
    IdVivienda: any;

    banderaLocalidad = false;
    banderaBarrio = false;
    banderaCalle = false;
    banderaNroCalle = false;
    banderaVinculo = false;
    banderaFechaNac = false;
    banderaEstudios = false;
    banderaEscuela = false;
    banderaProfesion = false;
    banderaSituacionLab = false;
    banderaObraSocial = false;
    banderaProbSocial = false;
    banderaTipoDiscapacidad = false;
    banderaTipoVivienda = false;
    banderaTipoModulo = false;
    banderaHabitaciones = false;
    banderaTipoTecho = false;
    banderaTipoPiso = false;
    banderaTipoBano = false;
    banderaAguaCte = false;
    banderaGasNatural = false;
    banderaRedCloacal = false;
    banderaContratoGas = false;
    banderaSituacionInmueble = false;
    banderaMetrosCons = false;
    banderaLocalCom = false;
    banderaTipoRubro = false;
    banderaNombreLocalCom = false;
    banderaNroLote = false;
    banderaNroPadron = false;
    banderaObservaciones = false;
    banderaConstruccion = false;


  constructor(
    public personaService: PersonaService, private activatedRoute: ActivatedRoute, private router: Router
  ) {
   }

  ngOnInit() {
    this.cargarDatosPersona();
    this.cargarDatosFormulario();
    this.cargarSocioeconomico();

    /*
    this.cargarBarrios();
    this.cargarLocalidades();
    this.cargarCalles();
    this.cargarEscuelas();
    this.cargarProblSocial();
    this.cargarSituacionInmueble();
    this.cargarTiposVivienda();
    this.cargarModulos();
    this.cargarTechos();
    this.cargarPisos();
    this.cargarBanos();
    this.cargarLocalesComerciales();*/

    this.forma = new FormGroup({
      IdBarrio: new FormControl(null ),
      IdCalle: new FormControl(null ),
      NroCalle: new FormControl(null ),
      IdLocalidad: new FormControl(null),
      Vinculo: new FormControl(null ),
      FechaNac: new FormControl(null ),
      EstudiosCursados: new FormControl(null ),
      IdEscuela: new FormControl(null ),
      IdTipoCasa: new FormControl(null ),
      Profesion: new FormControl(null ),
      SituacionLaboral: new FormControl(''),
      ObraSocial: new FormControl(''),
      IdProblSocial: new FormControl(null ),
      TipoDiscapacidad: new FormControl( null),
      IdVivienda: new FormControl(null),
      IdTipoVivienda: new FormControl(null),
      IdModulo: new FormControl(null),
      Habitaciones: new FormControl(null),
      IdTecho: new FormControl(null),
      IdPiso: new FormControl(null),
      IdBano: new FormControl(null),
      AguaCte: new FormControl(null),
      GasNatural: new FormControl(null),
      RedCloacal: new FormControl(null),
      ContratoGas: new FormControl(null),
      IdSituacionInmueble: new FormControl(null),
      IdTipo: new FormControl(null),
      IdLocalComercial: new FormControl(null),
      IdConstruccion: new FormControl(null),
      MetrosConstruccion: new FormControl(null),
      TipoRubro: new FormControl(null),
      NombreLocalComercial: new FormControl(null),
      NroLote: new FormControl(null),
      NroPadron: new FormControl(null),
      Observaciones: new FormControl(null)

    });
  }

// ==================================================
//  Carga la persona con sus datos socioeconomicos para mostrar en el formulario
// ==================================================

cargarSocioeconomico() {

    this.cargando = true;
    this.date = this.activatedRoute.snapshot.paramMap.get('id');  // Id de la persona
    console.log('this.date cargarSocioeconomico es : ', this.date);

    // Paso '0' para enviar que me devuelva el ultimo SE de la persona
    this.personaService.dameSocioEconomico( this.date , 0)
               .subscribe( (resp: any) => {

                console.log('resp en cargarSocioeconomico es : ', resp);

                this.SocioEconomico = resp[0];
                console.log('this.SocioEconomico en cargarSocioeconomico es : ', this.SocioEconomico);
                if (this.SocioEconomico === undefined) {
                  return;
                }
                // console.log('this.SocioEconomico en cargarDatos es : ', this.SocioEconomico.Correo);

                // this.Apellidos = this.SocioEconomico.Apellidos || '';
                // this.Nombres =  this.SocioEconomico.Nombres || '';

                this.IdBarrio = this.SocioEconomico.IdBarrio;
                this.IdLocalidad = this.SocioEconomico.IdLocalidad;
                this.IdEscuela = this.SocioEconomico.IdEscuela;
                this.IdProblSocial = this.SocioEconomico.IdProblSocial;
                this.IdTipoVivienda = this.SocioEconomico.IdTipoVivienda;
                this.IdTipoModulo = this.SocioEconomico.IdTipoModulo;
                this.IdTipoTecho = this.SocioEconomico.IdTipoTecho;
                this.IdTipoPiso = this.SocioEconomico.IdTipoPiso;
                this.IdTipoBano = this.SocioEconomico.IdTipoBano;
                this.IdSituacionInmueble = this.SocioEconomico.IdSituacionInmueble;
                this.IdCalle = this.SocioEconomico.IdCalle;
                this.NroCalle = this.SocioEconomico.NroCalle;
                this.IdEscuela = this.SocioEconomico.IdEscuela;
                // this.IdTipoCasa = this.SocioEconomico.IdTipoCasa;
                this.IdProblSocial = this.SocioEconomico.IdProblSocial;
                this.IdVivienda = this.SocioEconomico.IdVivienda;
                this.IdLocalComercial = this.SocioEconomico.IdLocalComercial;
                this.IdConstruccion = this.SocioEconomico.IdConstruccion;

                this.Barrio = this.SocioEconomico.Barrio;
                // this.Calle =  this.SocioEconomico.IdCalle;
                this.Calle =  this.SocioEconomico.Calle;
                this.Localidad =  this.SocioEconomico.Localidad;
                this.Vinculo = this.SocioEconomico.Vinculo;
                this.FechaNac = this.SocioEconomico.FechaNac;
                this.EstudiosCursados =  this.SocioEconomico.EstudiosCursados;
                this.Escuela =  this.SocioEconomico.Escuela;
                this.TipoCasa =  this.SocioEconomico.TipoCasa;
                this.Profesion = this.SocioEconomico.Profesion;
                this.SituacionLaboral =  this.SocioEconomico.SituacionLaboral;
                this.ObraSocial = this.SocioEconomico.ObraSocial;
                this.ProblSocial = this.SocioEconomico.ProblSocial;
                this.TipoDiscapacidad = this.SocioEconomico.TipoDiscapacidad;
                this.Vivienda = this.SocioEconomico.Vivienda;
                this.Modulo =  this.SocioEconomico.Modulo;
                this.Habitaciones =  this.SocioEconomico.Habitaciones;
                this.Techo = this.SocioEconomico.Techo;
                this.Piso =  this.SocioEconomico.Piso;
                this.Bano =  this.SocioEconomico.Bano;
                this.AguaCte =  this.SocioEconomico.AguaCte;
                this.GasNatural = this.SocioEconomico.GasNatural;
                this.RedCloacal =  this.SocioEconomico.RedCloacal;
                this.ContratoGas =  this.SocioEconomico.ContratoGas;
                this.SituacionInmueble =  this.SocioEconomico.SituacionInmueble;
                this.Vivienda = this.SocioEconomico.Vivienda;
                this.LocalComercial =  this.SocioEconomico.LocalComercial;
                this.Construccion =  this.SocioEconomico.Construccion;
                this.Observaciones =  this.SocioEconomico.Observaciones;
                this.MetrosConstruccion = this.SocioEconomico.MetrosConstruccion;
                this.TipoRubro =  this.SocioEconomico.TipoRubro;
                this.NombreLocalComercial =  this.SocioEconomico.NombreLocalComercial;
                this.NroLote =  this.SocioEconomico.NroLote;
                this.NroPadron =  this.SocioEconomico.NroPadron;
                // this.IdPersona =  this.SocioEconomico.IdPersona;

                this.cargando = false;

              });

    }

// ==================================================
//  Carga nombre y apellido para mostrar en el HTML
// ==================================================

cargarDatosPersona() {

  this.cargando = true;
  this.date = this.activatedRoute.snapshot.paramMap.get('id');
  console.log('this.date cargarDatos es : ', this.date);

  // Devuelve SocioEconomico y Apellido y nombre de la persona (Para cargar en el HTML)
  this.personaService.damePersonaPadron( this.date )
             .subscribe( (resp: Persona) => {

              console.log('resp en cargarDatosPersona es : ', resp);

              this.datosPersona = resp[0];
              console.log('this.datosPersona en cargarDatosPersona es : ', this.datosPersona);
              // console.log('this.SocioEconomico en cargarDatos es : ', this.SocioEconomico.Correo);

              this.Apellidos = this.datosPersona.Apellidos;
              this.Nombres =  this.datosPersona.Nombres;

              this.cargando = false;

            });

  }


// =================================================
//   Actualiza el socioeconomico de una persona
// ==================================================

actualizaSocioeconomico( ) {
  console.log('Formulario valido y actualiza cliente ingreso');

  console.log('this.forma actualizaSocioeconomico ES  : ', this.forma);
  // console.log('this.Correo actualizar : ', this.Correo);


  const socioEconomico = new SocioEconomico(
    this.forma.value.IdBarrio = this.forma.value.IdBarrio || this.IdBarrio,
    this.forma.value.IdCalle = this.forma.value.IdCalle || this.IdCalle,
    this.forma.value.NroCalle = this.forma.value.NroCalle || this.NroCalle,
    this.forma.value.IdLocalidad = this.forma.value.IdLocalidad || this.IdLocalidad,
    this.forma.value.Vinculo = this.forma.value.Vinculo || this.Vinculo,
    this.forma.value.FechaNac = this.forma.value.FechaNac || this.FechaNac,
    this.forma.value.EstudiosCursados = this.forma.value.EstudiosCursados || this.EstudiosCursados,
    this.forma.value.IdEscuela = this.forma.value.IdEscuela || this.IdEscuela,
    this.forma.value.IdTipoCasa = this.forma.value.IdTipoCasa || this.IdTipoCasa,
    this.forma.value.Profesion = this.forma.value.Profesion || this.Profesion,
    this.forma.value.SituacionLaboral = this.forma.value.SituacionLaboral || this.SituacionLaboral,
    this.forma.value.ObraSocial = this.forma.value.ObraSocial || this.ObraSocial,
    this.forma.value.IdProblSocial = this.forma.value.IdProblSocial || this.IdProblSocial,
    this.forma.value.TipoDiscapacidad = this.forma.value.TipoDiscapacidad || this.TipoDiscapacidad,
    this.forma.value.IdVivienda = this.forma.value.IdVivienda || this.IdVivienda,
    this.forma.value.IdTipoVivienda = this.forma.value.IdTipoVivienda || this.IdTipoVivienda,
    this.forma.value.IdModulo = this.forma.value.IdModulo || this.IdTipoModulo,
    this.forma.value.Habitaciones = this.forma.value.Habitaciones || this.Habitaciones,
    this.forma.value.IdTecho = this.forma.value.IdTecho || this.IdTipoTecho,
    this.forma.value.IdPiso = this.forma.value.IdPiso || this.IdTipoPiso,
    this.forma.value.IdBano = this.forma.value.IdBano || this.IdTipoBano,
    this.forma.value.AguaCte = this.forma.value.AguaCte || this.AguaCte,
    this.forma.value.GasNatural = this.forma.value.GasNatural || this.GasNatural,
    this.forma.value.RedCloacal = this.forma.value.RedCloacal || this.RedCloacal,
    this.forma.value.ContratoGas = this.forma.value.ContratoGas || this.ContratoGas,
    this.forma.value.IdSituacionInmueble = this.forma.value.IdSituacionInmueble || this.IdSituacionInmueble,
    this.forma.value.IdLocalComercial = this.forma.value.IdLocalComercial || this.IdLocalComercial,
    this.forma.value.IdConstruccion = this.forma.value.IdConstruccion || this.IdConstruccion,
    this.forma.value.Observaciones = this.forma.value.Observaciones || this.Observaciones,
    this.forma.value.MetrosConstruccion = this.forma.value.MetrosConstruccion || this.MetrosConstruccion,
    this.forma.value.TipoRubro = this.forma.value.TipoRubro || this.TipoRubro,
    this.forma.value.NombreLocalComercial = this.forma.value.NombreLocalComercial || this.NombreLocalComercial,
    this.forma.value.NroLote = this.forma.value.NroLote || this.NroLote,
    this.forma.value.NroPadron = this.forma.value.NroPadron || this.NroPadron,
    this.forma.value.IdPersona = this.date

  );

  console.log('socioEconomico armado en socioEconomico.component es : ', socioEconomico);

  // Swal.fire({
  //   position: 'top-end',
  //   icon: 'success',
  //   title: 'Cliente actualizado',
  //   showConfirmButton: false,
  //   timer: 2000
  // });

  this.personaService.editarSocioEconomico( socioEconomico )
             .subscribe( (resp: any) => {

              console.log('cargarsocioEconomico resp : ' , resp);

              if ( resp.message === 'Ok') {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Datos actualizados',
                  showConfirmButton: false,
                  timer: 2000
                });
                this.router.navigate(['/personas']);
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error al actualizar',
                  text: resp.message,
                });
                return;
              }
             });
}

// ==================================================
// Carga los datos de localidades,barrios,calles, etc de la BD para poder seleccionar entre 
// algunos de ellos en el HTML
// ==================================================

cargarDatosFormulario() {

  this.cargando = true;

  this.personaService.dameDatosFormulario( )
             .subscribe( (resp: any) => {

              console.log('resp en dameDatosFormulario todas en clientes.component es : ', resp);

//              this.totalClientes = resp[1][0].maximo;
              // this.datosFormulario = resp;
              this.localidades = resp[0];
              console.log('this.localidades todas es : ', this.localidades);

              this.barrios = resp[1];
              this.escuelas = resp[2];
              this.localescomerciales = resp[3];
              this.calles = resp[4];
              this.problSociales = resp[5];
              this.tiposVivienda = resp[6];
              this.modulos = resp[7];
              this.pisos = resp[8];
              this.banos = resp[9];
              this.situacionesInmuebles = resp[10];
              this.techos = resp[11];

              this.cargando = false;

            });

}

// ==================================================
// Modifica la bandera de localidad
// ==================================================

modificaBanderaLocalidad() {

  if (this.banderaLocalidad === false) {
  this.banderaLocalidad = true;
  } else {
   this.banderaLocalidad = false;
  }
}


// ==================================================
// Modifica la bandera de barrio
// ==================================================

modificaBanderaBarrio() {

  if (this.banderaBarrio === false) {
  this.banderaBarrio = true;
  } else {
   this.banderaBarrio = false;
  }
}



// ==================================================
// Modifica la bandera de banderaTipoModulo
// ==================================================

modificaBanderaTipoModulo() {

  if (this.banderaTipoModulo === false) {
  this.banderaTipoModulo = true;
  } else {
   this.banderaTipoModulo = false;
  }
}



// ==================================================
// Modifica la bandera de banderaTipoVivienda
// ==================================================

modificaBanderaTipoVivienda() {

  if (this.banderaTipoVivienda === false) {
  this.banderaTipoVivienda = true;
  } else {
   this.banderaTipoVivienda = false;
  }
}



// ==================================================
// Modifica la bandera de banderaSituacionInmueble
// ==================================================

modificaBanderaSituacionInmueble() {

  if (this.banderaSituacionInmueble === false) {
  this.banderaSituacionInmueble = true;
  } else {
   this.banderaSituacionInmueble = false;
  }
}



// ==================================================
// Modifica la bandera de modificaBanderaTecho
// ==================================================

modificaBanderaTipoTecho() {

  if (this.banderaTipoTecho === false) {
  this.banderaTipoTecho = true;
  } else {
   this.banderaTipoTecho = false;
  }
}



// ==================================================
// Modifica la bandera de piso
// ==================================================

modificaBanderaPiso() {

  if (this.banderaTipoPiso === false) {
  this.banderaTipoPiso = true;
  } else {
   this.banderaTipoPiso = false;
  }
}



// ==================================================
// Modifica la bandera de baño
// ==================================================

modificaBanderaBano() {

  if (this.banderaTipoBano=== false) {
  this.banderaTipoBano = true;
  } else {
   this.banderaTipoBano = false;
  }
}



// ==================================================
// Modifica la bandera de local comercial
// ==================================================

modificaBanderaLocalCom() {

  if (this.banderaLocalCom === false) {
  this.banderaLocalCom = true;
  } else {
   this.banderaLocalCom = false;
  }
}



// ==================================================
// Modifica la bandera de construccion
// ==================================================

modificaBanderaConstruccion() {

  if (this.banderaConstruccion === false) {
  this.banderaConstruccion = true;
  } else {
   this.banderaConstruccion = false;
  }
}



// ==================================================
// Modifica la bandera de calles
// ==================================================

modificaBanderaCalle() {

  if (this.banderaCalle === false) {
  this.banderaCalle = true;
  } else {
   this.banderaCalle = false;
  }
}



// ==================================================
// Modifica la bandera de escuela
// ==================================================

modificaBanderaEscuela() {

  if (this.banderaEscuela === false) {
  this.banderaEscuela = true;
  } else {
   this.banderaEscuela = false;
  }
}



// ==================================================
// Modifica la bandera de tipo de vivienda
// ==================================================

modificaBanderaVivienda() {

  if (this.banderaTipoVivienda === false) {
  this.banderaTipoVivienda = true;
  } else {
   this.banderaTipoVivienda = false;
  }
}



// ==================================================
// Modifica la bandera de prob social
// ==================================================

modificaBanderaProbSocial() {

  if (this.banderaProbSocial === false) {
  this.banderaProbSocial = true;
  } else {
   this.banderaProbSocial = false;
  }
}



// ==================================================
// Modifica la bandera de nro calle
// ==================================================

modificaBanderaNroCalle() {

  if (this.banderaNroCalle === false) {
  this.banderaNroCalle = true;
  } else {
   this.banderaNroCalle = false;
  }
}



// ==================================================
// Modifica la bandera de vinculo
// ==================================================

modificaBanderaVinculo() {

  if (this.banderaVinculo === false) {
  this.banderaVinculo = true;
  } else {
   this.banderaVinculo = false;
  }
}



// ==================================================
// Modifica la bandera de fecha de nac
// ==================================================

modificaBanderaFechaNac() {

  if (this.banderaFechaNac === false) {
  this.banderaFechaNac = true;
  } else {
   this.banderaFechaNac = false;
  }
}



// ==================================================
// Modifica la bandera de estudios cursados
// ==================================================

modificaBanderaEstudios() {

  if (this.banderaEstudios === false) {
  this.banderaEstudios = true;
  } else {
   this.banderaEstudios = false;
  }
}



// ==================================================
// Modifica la bandera de profesion
// ==================================================

modificaBanderaProfesion() {

  if (this.banderaProfesion === false) {
  this.banderaProfesion = true;
  } else {
   this.banderaProfesion = false;
  }
}



// ==================================================
// Modifica la bandera de situacion laboral
// ==================================================

modificaBanderaSituLab() {

  if (this.banderaSituacionLab === false) {
  this.banderaSituacionLab = true;
  } else {
   this.banderaSituacionLab = false;
  }
}



// ==================================================
// Modifica la bandera de obra social
// ==================================================

modificaBanderaObraSoc() {

  if (this.banderaObraSocial === false) {
  this.banderaObraSocial = true;
  } else {
   this.banderaObraSocial = false;
  }
}



// ==================================================
// Modifica la bandera de tipo de discapacidad
// ==================================================

modificaBanderaTipoDiscapacidad() {

  if (this.banderaTipoDiscapacidad === false) {
  this.banderaTipoDiscapacidad = true;
  } else {
   this.banderaTipoDiscapacidad = false;
  }
}



// ==================================================
// Modifica la bandera de habitaciones
// ==================================================

modificaBanderaHabitaciones() {

  if (this.banderaHabitaciones === false) {
  this.banderaHabitaciones = true;
  } else {
   this.banderaHabitaciones = false;
  }
}

// ==================================================
// Modifica la bandera de agua corriente
// ==================================================

modificaBanderaAguaCte() {

  if (this.banderaAguaCte === false) {
  this.banderaAguaCte = true;
  } else {
   this.banderaAguaCte = false;
  }
}



// ==================================================
// Modifica la bandera de gas natual
// ==================================================

modificaBanderaGasNatual() {

  if (this.banderaGasNatural === false) {
  this.banderaGasNatural = true;
  } else {
   this.banderaGasNatural = false;
  }
}



// ==================================================
// Modifica la bandera de red cloacal
// ==================================================

modificaBanderaRedCloacal() {

  if (this.banderaRedCloacal === false) {
  this.banderaRedCloacal = true;
  } else {
   this.banderaRedCloacal = false;
  }
}



// ==================================================
// Modifica la bandera de contrato gas
// ==================================================

modificaBanderaContratoGas() {

  if (this.banderaContratoGas === false) {
  this.banderaContratoGas = true;
  } else {
   this.banderaContratoGas = false;
  }
}



// ==================================================
// Modifica la bandera de observaciones
// ==================================================

modificaBanderaObservaciones() {

  if (this.banderaObservaciones === false) {
  this.banderaObservaciones = true;
  } else {
   this.banderaObservaciones = false;
  }
}



// ==================================================
// Modifica la bandera de metros de constr
// ==================================================

modificaBanderaMetrosCons() {

  if (this.banderaMetrosCons === false) {
  this.banderaMetrosCons = true;
  } else {
   this.banderaMetrosCons = false;
  }
}



// ==================================================
// Modifica la bandera de tipo de rubro
// ==================================================

modificaBanderaTipoRubro() {

  if (this.banderaTipoRubro === false) {
  this.banderaTipoRubro = true;
  } else {
   this.banderaTipoRubro = false;
  }
}



// ==================================================
// Modifica la bandera de nombre de local comercial
// ==================================================

modificaBanderaNombLocalCom() {

  if (this.banderaNombreLocalCom === false) {
  this.banderaNombreLocalCom = true;
  } else {
   this.banderaNombreLocalCom = false;
  }
}



// ==================================================
// Modifica la bandera de nro lote
// ==================================================

modificaBanderaNroLote() {

  if (this.banderaNroLote === false) {
  this.banderaNroLote = true;
  } else {
   this.banderaNroLote = false;
  }
}


// ==================================================
// Modifica la bandera de nro padron
// ==================================================

modificaBanderaNroPadron() {

  if (this.banderaNroPadron === false) {
  this.banderaNroPadron = true;
  } else {
   this.banderaNroPadron = false;
  }
}


}
