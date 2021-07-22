import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ControlService } from 'src/app/services/control/control.service';
import { Router } from '@angular/router';


declare var swal: any;

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styles: []
})
export class GruposComponent implements OnInit {

  grupos: any;
desde = 0;
  // cargando = false;
totalGrupos = 0;
incluyeBajas = 0;


  constructor(
    public controlService: ControlService,
    private router: Router
  ) {
   }

  ngOnInit() {
    this.cargarGrupos();
  }

// ==================================================
//        Modifica la bandera de incluye bajas
// ==================================================
modificaBandera(  ) {

  if (this.incluyeBajas === 0) {
  this.incluyeBajas = 1;
  } else {
  this.incluyeBajas = 0;
  }
  this.cargarGrupos();
}

// ==================================================
// Carga los grupos familiares
// ==================================================

cargarGrupos() {

    this.controlService.cargarGruposFamiliares( this.desde )
               .subscribe( (resp: any) => {

                console.log('resp en cargarGrupos.component es : ', resp);

                this.totalGrupos = resp[1][0].cantGrupos;

                this.grupos = resp[0];
                console.log('this.grupos es : ', this.grupos);

              });

  }

// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  this.desde += valor;

  if ( this.desde >= this.totalGrupos ) {
    console.log('Entro primer if');
    return;
  }

  if ( this.desde < 0 ) {
    console.log('Entro seg if');
    this.desde = 0;
    return;
  }
  console.log('Llego');
  // this.desde += valor;
  this.cargarGrupos();

}

}
