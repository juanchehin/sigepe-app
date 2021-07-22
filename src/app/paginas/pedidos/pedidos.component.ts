import { Component, OnInit } from '@angular/core';
import { Persona } from '../../models/persona.model';
import { PersonaService, PedidoService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from 'src/app/models/pedido.model';

declare var swal: any;

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styles: []
})
export class PedidosComponent implements OnInit {

  pedidos: Pedido[] = [];
  date = '';
  datosPersona: any;
  desde = 0;

  IdPersona: string;
  Apellidos: string;
  Nombres: string;

  forma: FormGroup;
  totalPedidos = 0;
  cargando = true;
  planSeleccionado = 0;  // Parametro seleccionado en el SELECT de planes
  estadoSeleccionado = 'N';  // Parametro seleccionado en el SELECT de los estados de clientes


  constructor(
    public personaService: PersonaService,
    public pedidoService: PedidoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.planSeleccionado = 0;
   }

  ngOnInit() {
    this.IdPersona = this.activatedRoute.snapshot.paramMap.get('id');
    this.cargarDatosPersonaPadron();
    this.cargarPedidos();
    this.forma = new FormGroup({
      Apellidos: new FormControl(null ),
      Nombres: new FormControl(null )
    });
  }


// ==================================================
//  Carga los datos de la persona que necesita el pedido (para mostrar en el titulo del form)
// ==================================================

cargarDatosPersonaPadron() {

  this.cargando = true;

  console.log('this.IdPersona cargarDatos es : ', this.IdPersona);

  // Devuelve SocioEconomico y Apellido y nombre de la persona (Para cargar en el HTML)
  this.personaService.damePersonaPadron( this.IdPersona )
             .subscribe( (resp: Persona) => {

              console.log('resp en cargarDatosPersona es : ', resp);

              this.datosPersona = resp[0];
              console.log('this.datosPersona en cargarDatos es : ', this.datosPersona);
              // console.log('this.SocioEconomico en cargarDatos es : ', this.SocioEconomico.Correo);

              this.IdPersona = this.datosPersona.IdPersona;
              this.Apellidos = this.datosPersona.Apellidos;
              this.Nombres =  this.datosPersona.Nombres;

              this.cargando = false;

            });

  }




// ==================================================
// Carga los pedidos pendientes de una persona
// ==================================================

  cargarPedidos() {
    console.log('cargarPedidos  entro' );
    this.cargando = true;
    console.log('this.IdPersona  entro : ', this.IdPersona );

    this.pedidoService.cargarPedidos( this.desde , this.IdPersona )
               .subscribe( (resp: any) => {

                // console.log('resp en personas.component es : ', resp);

                  // Desactivado por no tener un ID la tabla Personas de PADRON
                // this.totalPedidos = resp[1][0].maximo;
                // console.log('this.totalPersonas es : ', this.totalPedidos);

                this.pedidos = resp[0];
                console.log('this.pedidos es : ', this.pedidos);

                this.cargando = false;

              });

  }

// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  console.log('Ingreso a cambiarDesde, valor es : ', valor);

  const desde = this.desde + valor;

  if ( desde >= this.totalPedidos ) {
    console.log('Entro primer if');
    return;
  }

  if ( desde < 0 ) {
    console.log('Entro seg if');
    return;
  }

  this.desde += valor;

  this.cargarPedidos();

}

}
