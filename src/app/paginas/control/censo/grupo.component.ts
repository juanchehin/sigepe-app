import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ControlService } from 'src/app/services/control/control.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GestorService } from 'src/app/services/service.index';
import * as XLSX from 'xlsx';


declare var swal: any;

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styles: []
})
export class GrupoComponent implements OnInit {

  datos: any;
  IdGrupoFamiliar: string;
  integrantes: any;
  modulos: any;
  IdModulo: string;
  IdModulo1: any;
  Modulo: any = null;
  CantEntregas: any;

  Barrio: any;
  Manzana: any;
  JefeFamilia: any;
  FechaCarga: any;
  Apellidos: any;
  Nombres: any;

  fileName= 'IntegrantesGrupoFamiliar.xlsx';


  constructor(
    public controlService: ControlService,
    public gestorService: GestorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
   }

  ngOnInit() {
    this.cargarGrupo();
  }

  exportexcel(): void
    {
       /* table id is passed over here */
       let element = document.getElementById('excel-table');
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);

    }

// ==================================================
//   Modificacion del modulo
// ==================================================
modificaModulo( IdModuloAlimenticio ) {

  this.IdModulo = IdModuloAlimenticio;
  console.log('pIdModulo es : ', IdModuloAlimenticio);
  // console.log('IdGrupoFamiliar es : ');
 }

// ==================================================
// Carga los datos del grupo dado su ID
// ==================================================

cargarGrupo() {

    this.IdGrupoFamiliar = this.activatedRoute.snapshot.paramMap.get('IdGrupoFamiliar');

    console.log('this.IdGrupoFamiliar es : ', this.IdGrupoFamiliar);

    this.controlService.cargarDatosGrupoFamiliar( this.IdGrupoFamiliar )
               .subscribe( (resp: any) => {

                console.log('resp en cargarDatosGrupoFamiliar.component es : ', resp);

                this.integrantes = resp[1];

                // this.datos = resp[0];

                this.Barrio = resp[0][0].Barrio;
                this.Manzana = resp[0][0].Manzana;
                this.Apellidos = resp[0][0].Apellidos;
                this.Nombres = resp[0][0].Nombres;
                this.Manzana = resp[0][0].Manzana;
                this.FechaCarga = resp[0][0].Fecha;
                this.Manzana = resp[0][0].Manzana;
                this.IdGrupoFamiliar = resp[0][0].IdGrupoFamiliar;
                this.Modulo = resp[0][0].Modulo;
                this.CantEntregas = resp[0][0].CantEntregas;
                // console.log('this.datos es : ', this.datos);

              });

  }

}
