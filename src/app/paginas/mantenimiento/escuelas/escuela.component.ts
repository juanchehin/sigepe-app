import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
// import { UsuarioService, PersonaService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Observable, Subject } from 'rxjs';
import { Localidad } from '../../../models/localidad.model';
import { GestorService } from 'src/app/services/service.index';
import { Escuela } from 'src/app/models/escuela.model';


@Component({
  selector: 'app-escuela',
  templateUrl: './escuela.component.html',
  styleUrls: []
})
export class EscuelaComponent implements OnInit {

  forma: FormGroup;
  localidades: any;
  calles: any;


  constructor(
    public gestorService: GestorService,
    private router: Router
  ) {
   }


  ngOnInit() {

    this.cargarCalles();
    this.cargarLocalidades();

    this.forma = new FormGroup({
      IdCalle: new FormControl(null, Validators.required ),
      IdLocalidad: new FormControl(null, Validators.required ),
      Escuela: new FormControl(null, Validators.required ),
      Director: new FormControl(null ),
      NroCalle: new FormControl(null ),
      Estado: new FormControl(null )
    });
  }

// ==================================================
//        Nueva Escuela
// ==================================================

  nuevaEscuela() {

    if ( this.forma.invalid ) {
      console.log('formulario invalido' , this.forma);
      return;
    }

    console.log('Formulario valido y Registrar Escuela ingreso');

    const escuela = new Escuela(
        null,
        this.forma.value.IdCalle,
        this.forma.value.IdLocalidad,
        this.forma.value.Escuela,
        this.forma.value.Director,
        this.forma.value.NroCalle,
        this.forma.value.Telefono
    );

    this.gestorService.crearEscuela( escuela )
              .subscribe( (resp: any) => {

                console.log('resp.message en crearEscuela es : ', resp.mensaje);

                console.log('resp en crearEscuela es : ', resp);


                if ( resp.Mensaje === 'Ok') {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Escuela creada',
                  showConfirmButton: false,
                  timer: 2000
                });
                this.router.navigate(['/mantenimiento/escuelas']);
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error al crear la escuela',
                  text: 'Contactese con el administrador',
                });
                return;
              }
             });
}
// ==================================================
//        Carga de Roles desde la BD
// ==================================================

cargarLocalidades() {

  this.gestorService.cargarTodasLocalidades( )
             .subscribe( (resp: any) => {

              console.log('resp en cargarLocalidades todas en esc.component es : ', resp);

              // this.totalRoles = resp[1][0].maximo;
              this.localidades = resp[0];
              console.log('this.localidades cargarLocalidades todas es : ', this.localidades);


            });

}

// ==================================================
//        Carga de calles desde la BD
// ==================================================

cargarCalles() {

  this.gestorService.cargarTodasCalles( )
             .subscribe( (resp: any) => {

              console.log('resp en cargarCalles todas en .component es : ', resp);

              // this.totalRoles = resp[1][0].maximo;
              this.calles = resp[0];
              console.log('this.calles todas es : ', this.calles);


            });

}

}
