import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../models/pedido.model';
import { Persona } from '../../models/persona.model';
// import { SocioEconomico } from '../../models/socioeconomico.model';
import { PersonaService, PedidoService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


declare var swal: any;

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styles: []
})
export class PedidoComponent implements OnInit {

    cargando = false;
    private date: string;
    datosPersona: any;
    tiposPedidos: any;
    valorCheck: any;
    IdBeneficiario: any;

    TipoPedido: any;

    forma: FormGroup;
    Apellidos: string;
    Nombres: string;
    banderaAyudaEconomica = false;
    banderaSalud = false;
    banderaVivienda = false;
    banderaInstituciones = false;
    banderaFallecimientos = false;

  constructor(
    public personaService: PersonaService,
    public pedidoService: PedidoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
   }

  ngOnInit() {
    this.cargarDatosPersona();
    // this.cargarTiposPedidos();

    this.forma = new FormGroup({
      IdTipoPedido: new FormControl(null, Validators.required ),
      Autorizado: new FormControl(null),
      Beneficiario: new FormControl(),
      Observaciones: new FormControl(null )
    });
  }


// ==================================================
//  Activa la bandera especifica para mostrar el subtipo - ver 'Inserts.sql'
// ==================================================

activarBandera(IdTipoPedido: any) {
  console.log('IdTipoPedidos es : ', IdTipoPedido);

  // Salud
  if (IdTipoPedido === 1) {
    this.banderaSalud = true;
  } else {
    this.banderaSalud = false;
  }
  // Ayuda economica
  if (IdTipoPedido === 2) {
    this.banderaAyudaEconomica = true;
  } else {
    this.banderaAyudaEconomica = false;
  }
  // Ayuda vivienda
  if (IdTipoPedido === 3) {
    this.banderaVivienda = true;
  } else {
    this.banderaVivienda = false;
  }
  // Instituciones
  if (IdTipoPedido === 4) {
    this.banderaInstituciones = true;
  } else {
    this.banderaInstituciones = false;
  }
  // Fallecimientos
  if (IdTipoPedido === 5) {
    this.banderaFallecimientos = true;
  } else {
    this.banderaFallecimientos = false;
  }

}

// ==================================================
//  Carga los datos de la persona que necesita el pedido (para mostrar en el titulo del form)
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
                console.log('this.datosPersona en cargarDatos es : ', this.datosPersona);
                // console.log('this.SocioEconomico en cargarDatos es : ', this.SocioEconomico.Correo);

                this.Apellidos = this.datosPersona.Apellidos;
                this.Nombres =  this.datosPersona.Nombres;

                this.cargando = false;

              });

    }

// ==================================================
//     Carga de los tipos de pedido desde la BD
// ==================================================

cargarTiposPedidos() {

  this.pedidoService.dameTiposPedido( )
             .subscribe( (resp: any) => {

              console.log('resp en cargarTiposPedidos todas en pedido.component es : ', resp);

              // this.totalRoles = resp[1][0].maximo;
              this.tiposPedidos = resp;
              console.log('this.tiposPedidos todas es : ', this.tiposPedidos);


            });

}

// ==================================================
//        Nuevo Pedido
// ==================================================

registrarPedido() {

  this.date = this.activatedRoute.snapshot.paramMap.get('id');
  console.log('this.date registrarPedido es : ', this.date);

  if ( this.forma.invalid ) {
    console.log('formulario pedido invalido' , this.forma);
    // console.log('formulario invalido');

    return;
  }
  console.log('Beneficiario es : ' , this.forma.value.Beneficiario);

  // Pregunta si el que pidio es el que lo recibira
  if (this.forma.value.Beneficiario === true) {
    this.IdBeneficiario = this.date;
    console.log('Beneficiario es en el IF : ' , this.IdBeneficiario);
  } else {
    this.IdBeneficiario = this.date;  // <-- Aqui va el Id del beneficiairo, MODIFICAR
  }

  console.log('Formulario Pedido valido y Registrar Pedido ingreso , this.forma es : ', this.forma);

  const pedido = new Pedido(
    // this.forma.value.IdPedido,
    this.forma.value.IdTipoPedido,
    this.forma.value.IdPersonaBeneficiario = this.IdBeneficiario,
    this.forma.value.IdPersonaSolicitante = this.date,  // Puede ser el mismo que solicita
    null,  // Queda en pendiente de que se asigne a alguien
    null,
    this.forma.value.Autorizado,
    this.forma.value.Observaciones,
    null  // Lo setea la BD con 'P'
  );
  console.log('PEDIDO ARMADO ES : ' , pedido);
  this.pedidoService.crearPedido( pedido )
            .subscribe( (resp: any) => {

              console.log('resp.message en pedido subscribe es : ', resp.mensaje);

              console.log('resp en pedido subscribe es : ', resp);


              /*  Transformar resp.mensaje a JSON para que se pueda acceder*/

              if ( resp.mensaje === 'Ok') {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Pedido guardado',
                  showConfirmButton: false,
                  timer: 2000
                });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'No se cargo el pedido',
                  text:  'No se cargo el pedido'
              });
                return false;
              }
              this.router.navigate(['/personas']);
            });


          }
// ==================================================
//  Modifica el valor para que aparezca otro select
// ==================================================

modificarValor() {

  this.cargando = true;
  this.date = this.activatedRoute.snapshot.paramMap.get('id');
  console.log('this.date cargarDatos es : ', this.date);

  // Devuelve SocioEconomico y Apellido y nombre de la persona (Para cargar en el HTML)
  this.personaService.damePersonaPadron( this.date )
             .subscribe( (resp: Persona) => {

              console.log('resp en cargarDatosPersona es : ', resp);

              this.datosPersona = resp[0];
              console.log('this.datosPersona en cargarDatos es : ', this.datosPersona);
              // console.log('this.SocioEconomico en cargarDatos es : ', this.SocioEconomico.Correo);

              this.Apellidos = this.datosPersona.Apellidos;
              this.Nombres =  this.datosPersona.Nombres;

              this.cargando = false;

            });

  }

}
