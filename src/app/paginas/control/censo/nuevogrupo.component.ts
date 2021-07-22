import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, Form } from '@angular/forms';
import { PersonaService } from '../../../services/service.index';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Grupo } from '../../../models/grupo.model';
import { ControlService } from '../../../services/control/control.service';
import { GestorService } from '../../../services/gestor/gestor.service';


@Component({
  selector: 'app-nuevogrupo',
  templateUrl: './nuevogrupo.component.html',
  styleUrls: []
})
export class NuevoGrupoComponent implements OnInit {

  barrios: any;
  manzana: string;
  forma: FormGroup;

  cargando = true;
  aparecer = false;


  constructor(
    public gestorService: GestorService,
    public controlService: ControlService,
    private router: Router
  ) {
   }


  ngOnInit() {

    this.cargarBarrios();

    this.forma = new FormGroup({
      IdBarrio: new FormControl(null, Validators.required ),
      Manzana: new FormControl(null, Validators.required )
    });

  }

// ==================================================
//        Nueva Grupo Familiar
// ==================================================

nuevoGrupoFamiliar() {

    if ( this.forma.invalid ) {
      console.log('formulario invalido' , this.forma);
      // console.log('formulario invalido');

      return;
    }

    console.log('Formulario valido y Registrar cliente ingreso');

    const grupo = new Grupo(
      null,
      null,
      this.forma.value.IdBarrio,
      null,
      this.forma.value.Manzana,
      null,
      null
    );
    console.log('persona armada en persona.component es : ', grupo);
    this.controlService.crearGrupo( grupo )
              .subscribe( (resp: any) => {

                console.log('resp en crearGrupo subscribe es : ', resp.resp);
                console.log('resp Mensaje en crearGrupo subscribe es : ', resp.Mensaje);

                /*  Transformar resp.mensaje a JSON para que se pueda acceder*/
                if ( resp.resp[0].Mensaje === 'Ok') {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Grupo registrado',
                    showConfirmButton: false,
                    timer: 2000
                  });
                  this.controlService.IdGrupoFamiliarActual = resp.resp[0].IdGrupoFamiliar;
                  // console.log(' this.IdGrupoFamiliaren crearGrupo es : ',  this.IdGrupoFamiliar);
                  this.router.navigate(['/control/censo/grupo/persona', this.controlService.IdGrupoFamiliarActual]);
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: resp.Mensaje,
                  });
                  return;
                }
               });
            }




// ==================================================
//        Carga de barrios desde la BD
// ==================================================

cargarBarrios() {

  this.cargando = true;

  this.gestorService.dameBarriosAlta( )
             .subscribe( (resp: any) => {

              console.log('resp en cargarBarrios todas en clientes.component es : ', resp);

//              this.totalClientes = resp[1][0].maximo;
              this.barrios = resp[0];
              console.log('this.barrios todas es : ', this.barrios);

              this.cargando = false;

            });

}



}
