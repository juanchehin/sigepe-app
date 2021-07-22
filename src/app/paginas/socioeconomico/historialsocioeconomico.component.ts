import { Component, OnInit } from '@angular/core';
import { Persona } from '../../models/persona.model';
import { UsuarioService, PersonaService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { ActivatedRoute } from '@angular/router';

declare var swal: any;

@Component({
  selector: 'app-historialsocioeconomico',
  templateUrl: './historialsocioeconomico.component.html',
  styles: []
})
export class HistorialSocioEconomicoComponent implements OnInit {

  historialSE: any;
  desde = 0;
  cargando = false;
  totalUsuarios = 0;
  Apellidos: any;
  Nombres: any;
  IdPersona: any;


  constructor(
    public personaService: PersonaService,
    public usuariosService: UsuarioService,
    private activatedRoute: ActivatedRoute
  ) {
   }

  ngOnInit() {
    this.IdPersona = this.activatedRoute.snapshot.paramMap.get('IdPersona');
    this.cargarHistorialSocioeconomico();
    this.cargarDatos();
  }

// ==================================================
//  Carga los datos de la persona para mostrar en el formulario
// ==================================================
cargarDatos() {

    this.cargando = true;
    console.log('this.IdPersona cargarDatos es : ', this.IdPersona);

    // Devuelve SocioEconomico y Apellido y nombre de la persona (Para cargar en el HTML)
    this.personaService.damePersonaPadron( this.IdPersona )
               .subscribe( (resp: any) => {

                console.log('resp en cargarDatos es : ', resp);

                // this.SocioEconomico = resp[0];
                // console.log('this.SocioEconomico en cargarDatos es : ', this.SocioEconomico);
                // console.log('this.SocioEconomico en cargarDatos es : ', this.SocioEconomico.Correo);

                // this.Apellidos = this.SocioEconomico.Apellidos || '';
                // this.Nombres =  this.SocioEconomico.Nombres || '';

                this.Apellidos = resp[0].Apellidos;
                this.Nombres =  resp[0].Nombres;

              });

    }

// ==================================================
// Carga el historial SE de una persona
// ==================================================

cargarHistorialSocioeconomico() {
    // console.log('seleccionado  es : ', this.estadoSeleccionado );
    this.cargando = true;

    this.personaService.dameHistorialSocioeconomico( this.desde , this.IdPersona )
               .subscribe( (resp: any) => {

                console.log('resp en historialSE.component es : ', resp);

                this.historialSE = resp[0];
                console.log('this.historialSE es : ', this.historialSE);

                this.cargando = false;

              });

  }
// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  // const desde = this.desde + valor;

  /*if ( desde >= this.totalUsuarios ) {
    console.log('Entro primer if');
    return;
  }

  if ( desde < 0 ) {
    console.log('Entro seg if');
    return;
  }*/
  // console.log('Llego');
  this.desde += valor;
  this.cargarHistorialSocioeconomico();

}

}
