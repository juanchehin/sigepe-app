import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

import { GestorService } from '../../../services/gestor/gestor.service';
import { ControlService } from 'src/app/services/control/control.service';
import { DatosCenso } from 'src/app/models/datosCenso.model';


@Component({
  selector: 'app-personagrupo',
  templateUrl: './personagrupo.component.html',
  styleUrls: []
})
export class PersonaGrupoComponent implements OnInit {

  forma: FormGroup;

  enfermedades: any;
  lugaresTrabajo: any;
  IdGrupoFamiliarActual: any;
  IdPersonaActual: any;

  banderaMedicacion = false;
  banderaEmbarazo = false;

  totalLugaresTrabajo = 0;
  totalRoles = 0;

  constructor(
    private router: Router,
    private gestorService: GestorService,
    private controlService: ControlService,
    private activatedRoute: ActivatedRoute
  ) {
   }


  ngOnInit() {
    this.cargarEnfermedades();
    // this.cargarRoles();
    this.IdGrupoFamiliarActual = this.controlService.IdGrupoFamiliarActual;
    console.log('this.IdGrupoFamiliarActual 1', this.IdGrupoFamiliarActual);
    // Ingresa a este IF si se desea agregar un integrante a un grupo ya creado
    if((this.IdGrupoFamiliarActual === undefined) || (this.IdGrupoFamiliarActual === null)){
      this.IdGrupoFamiliarActual =  this.activatedRoute.snapshot.paramMap.get('IdGrupoFamiliar');
    }
    console.log('this.IdGrupoFamiliarActual 2', this.IdGrupoFamiliarActual);

    this.forma = new FormGroup({
      DNI: new FormControl(null, Validators.required ),
      Ocupacion: new FormControl(null ),
      Edad: new FormControl(null ),
      Embarazo: new FormControl(null ),
      SemanasEmbarazo: new FormControl(null ),
      Positivo: new FormControl(null ),
      Aislado: new FormControl(null ),
      JefeFamilia: new FormControl(null),
      IdEnfermedad: new FormControl(null),
      Medicacion: new FormControl(null),
      Observaciones: new FormControl(null)
    });

  }


// ==================================================
//        Nuevo persona para el grupo
// ==================================================

nuevaPersonaGrupo() {

    if ( this.forma.invalid ) {
      console.log('formulario invalido' , this.forma);
      // console.log('formulario invalido');

      return;
    }

    /*if ( this.validarDatos ) {
        console.log('Entro en validar datos' );
        // console.log('formulario invalido');
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La persona no existe',
          });
        return;
      }*/

    console.log('Formulario valido y Registrar cliente ingreso');

    const datosCenso = new DatosCenso(
      null,
      this.forma.value.IdEnfermedad,
      this.IdGrupoFamiliarActual,
      this.forma.value.Edad,
      this.forma.value.Ocupacion,
      this.forma.value.Medicacion,
      this.forma.value.JefeFamilia,
      this.forma.value.Positivo,
      this.forma.value.Embarazo,
      this.forma.value.SemanasEmbarazo,
      this.forma.value.DNI,
      this.forma.value.Aislado,
      this.forma.value.Observaciones
    );

    console.log('Formulario valido y datosCenso es : ', datosCenso);

    this.controlService.nuevaPersonaGrupo( datosCenso )
              .subscribe( (resp: any) => {

                console.log('resp.message en crearUsuario es : ', resp.ensaje);

                console.log('resp en crearUsuario es : ', resp);


                /*  Transformar resp.mensaje a JSON para que se pueda acceder*/

                if ( resp.Mensaje === 'Ok') {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Persona cargada',
                    showConfirmButton: false,
                    timer: 2000
                  });
                  this.router.navigate(['/control/censo' ]);
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Problema al cargar',
                    text: resp.mensaje,
                  });
                  return;
                }

                Swal.fire({
                  title: '¿Desea agregar otra persona?',
                  text: 'Seguir agregando',
                  icon: 'info',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Si, Agregar',
                  cancelButtonText: 'Finalizar carga',
                }).then((result) => {

                  if (result.value) {
                    this.router.navigate(['control/censo/grupo/persona', this.IdGrupoFamiliarActual]);
                  } else {
                    this.router.navigate(['/control/censo']);
                  }

                });

                this.router.navigate(['/control']);
              });


            }

// ==================================================
//   Consulta a la BD si existe la persona a cargar
// ==================================================

validarDatos() {
  console.log('this.forma.value.DNI en validarDatos todas en personasgrupo.component es : ', this.forma.value.DNI);
  this.controlService.validarDatos( this.forma.value.DNI )
             .subscribe( (resp: any) => {

              console.log('resp en validarDatos todas en personasgrupo.component es : ', resp);

              if ( resp.mensaje !== 'Ok') {
                  return false;
              }

              this.IdPersonaActual = resp.IdPersonaActual;

              console.log('this.enfermedades todas es : ', this.enfermedades);
              return true;
            });

}
// ==================================================
//        Carga las enfermedades dadas de alta
// ==================================================

cargarEnfermedades() {

  this.gestorService.dameTodasEnfermedades( )
             .subscribe( (resp: any) => {

              console.log('resp en dameEnfermedades todas en personas.component es : ', resp);

              // this.totalRoles = resp[1][0].maximo;
              this.enfermedades = resp[0];
              console.log('this.enfermedades todas es : ', this.enfermedades);


            });

}

// ==================================================
//     Modifica el valor de la bandera para mostrar 'Medicacion'
// ==================================================

activarBandera() {

  if ( this.banderaMedicacion) {
    this.banderaMedicacion = false;
  } else {
    this.banderaMedicacion = true;
  }

}
// ==================================================
//     Modifica el valor de la bandera para mostrar 'Semanas embarazo'
// ==================================================

activarBanderaEmbarazo() {

  if ( this.banderaEmbarazo) {
    this.banderaEmbarazo = false;
  } else {
    this.banderaEmbarazo = true;
  }

}

}
