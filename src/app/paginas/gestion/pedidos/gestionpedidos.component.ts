import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PersonaService, UsuarioService } from 'src/app/services/service.index';

declare var swal: any;

@Component({
  selector: 'app-gestionpedidos',
  templateUrl: './gestionpedidos.component.html',
  styles: []
})
export class GestionPedidosComponent implements OnInit {

  pedidos: any;
  desde = 0;
  totalAsistencias = true;
  ApellNombr = Array;

  totalPedidos = 0;
  IdRol: number;


  constructor(
    public personaService: PersonaService,
    private usuarioService: UsuarioService
  ) {
    this.IdRol = this.personaService.IdRol;
   }

  ngOnInit() {
    this.cargarPedidos();
  }

// ==================================================
// Carga de Pedidos
// ==================================================

cargarPedidos() {
    // console.log('seleccionado  es : ', this.estadoSeleccionado );

    this.usuarioService.damePedidos( this.desde )
               .subscribe( (resp: any) => {

                console.log('resp en gestpedidos.component es : ', resp);

                  // Desactivado por no tener un ID la tabla Personas de PADRON
                // this.totalPedidos = resp[1][0].maximo;
                // console.log('this.totalPersonas es : ', this.totalPersonas);

                this.pedidos = resp[0];
                console.log('this.pedidos es : ', this.pedidos);

              });

  }

// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  // console.log('Ingreso a cambiarDesde, valor es : ', valor);
  // console.log('Ingreso a cambiarDesde, this.totalPersonas es : ', this.totalPersonas);

  const desde = this.desde + valor;

  /*if ( desde >= this.totalPersonas ) {
     console.log('Entro primer if');
    return;
 }

   if ( desde < 0 ) {
     console.log('Entro seg if');
     return;
   }*/
  console.log('Llego');
  this.desde += valor;
  this.cargarPedidos();

}

}
