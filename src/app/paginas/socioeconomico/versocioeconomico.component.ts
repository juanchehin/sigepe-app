import { Component, OnInit } from '@angular/core';
import { Persona } from '../../models/persona.model';
import { SocioEconomico } from '../../models/socioeconomico.model';
import { PersonaService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';


declare var swal: any;

@Component({
  selector: 'app-versocioeconomico',
  templateUrl: './versocioeconomico.component.html',
  styles: []
})
export class VerSocioEconomicoComponent implements OnInit {

    cargando = false;
    // private date: string;
    IdSocioEconomico: string;
    SocioEconomico: any;
    datosPersona: any;

    Apellidos: string;
    Nombres: string;
    IdPersona: any;

    Barrio = '-';
    Calle = '-';
    NroCalle = '-';
    Localidad = '-';
    Vinculo = '';
    FechaNac = '-';
    EstudiosCursados = '-';
    Escuela = '-';
    Profesion = '-';
    SituacionLaboral = '-';
    ObraSocial = '-';
    ProblSocial = '-';
    TipoDiscapacidad = '-';
    Vivienda = '-';
    Modulo = '-';
    Habitaciones = '-';
    Techo = '-';
    Piso = '-';
    Bano = '-';
    AguaCte = '-';
    GasNatural = '-';
    RedCloacal = '-';
    ContratoGas = '-';
    SituacionInmueble = '-';
    TipoVivienda = '-';
    LocalComercial = '-';
    Construccion = '-';
    Observaciones = '-';

  constructor(
    public personaService: PersonaService, private activatedRoute: ActivatedRoute, private router: Router
  ) {
   }

  ngOnInit() {
    this.cargarSocioeconomico();
    this.cargarDatosPersona();
  }

// ==================================================
//  Carga un SE especifico de una personana dada su ID
// ==================================================

cargarSocioeconomico() {

    this.cargando = true;
    this.IdPersona = this.activatedRoute.snapshot.paramMap.get('IdPersona');
    this.IdSocioEconomico = this.activatedRoute.snapshot.paramMap.get('IdSocioeconomico');
    console.log('this.IdPersona cargarDatos es : ', this.IdPersona);

    // Devuelve SocioEconomico y Apellido y nombre de la persona (Para cargar en el HTML)
    this.personaService.dameSocioEconomico( this.IdPersona, this.IdSocioEconomico )
               .subscribe( (resp: any) => {

                console.log('resp en cargarDatos es : ', resp);

                this.SocioEconomico = resp[0];
                console.log('this.SocioEconomico en cargarDatos es : ', this.SocioEconomico);
                // console.log('this.SocioEconomico en cargarDatos es : ', this.SocioEconomico.Correo);

                // this.Apellidos = this.SocioEconomico.Apellidos || '';
                // this.Nombres =  this.SocioEconomico.Nombres || '';

                this.Barrio = this.SocioEconomico.Barrio;
                this.Calle =  this.SocioEconomico.Calle;
                this.NroCalle =  this.SocioEconomico.NroCalle;
                this.Localidad =  this.SocioEconomico.Localidad;
                this.Vinculo = this.SocioEconomico.Vinculo;
                this.FechaNac = this.SocioEconomico.FechaNac;
                this.EstudiosCursados =  this.SocioEconomico.EstudiosCursados;
                this.Escuela =  this.SocioEconomico.Escuela;
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
                this.TipoVivienda = this.SocioEconomico.TipoVivienda;
                this.LocalComercial =  this.SocioEconomico.LocalComercial;
                this.Construccion =  this.SocioEconomico.Construccion;
                this.Observaciones =  this.SocioEconomico.Observaciones;

                this.cargando = false;

              });

    }

// ==================================================
//  Carga los datos de la persona
// ==================================================

cargarDatosPersona() {

  this.cargando = true;
  this.IdPersona = this.activatedRoute.snapshot.paramMap.get('IdPersona');
  console.log('this.IdPersona cargarDatos es : ', this.IdPersona);

  // Devuelve SocioEconomico y Apellido y nombre de la persona (Para cargar en el HTML)
  this.personaService.damePersonaPadron( this.IdPersona )
             .subscribe( (resp: any) => {

              console.log('resp en cargarDatosPersona es : ', resp);

              this.datosPersona = resp[0];
              console.log('this.datosPersona en cargarDatosPersona es : ', this.datosPersona);
              // console.log('this.SocioEconomico en cargarDatos es : ', this.SocioEconomico.Correo);

              this.Apellidos = this.datosPersona.Apellidos;
              this.Nombres =  this.datosPersona.Nombres;
              this.IdPersona = this.datosPersona.IdPersona;

              this.cargando = false;

            });

  }


}