import { Component, OnInit } from '@angular/core';
import { Persona } from '../../../models/persona.model';
import { GestorService } from '../../../services/service.index';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Escuela } from '../../../models/escuela.model';

@Component({
  selector: 'app-editarescuela',
  templateUrl: './editarescuela.component.html',
  styles: []
})
export class EditarEscuelaComponent implements OnInit {

  forma: FormGroup;
  escuela: any;
  localidades: any;
  calles: any;
  sonIguales = false;

  Escuela: string;
  IdEscuela: number;
  IdLocalidad: number;
  IdCalle: number;
  Director: string;
  NroCalle: string;
  Estado: string;
  Localidad: string;
  Calle: string;

  private date: string;

  constructor(public gestorService: GestorService, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
  this.cargarEscuela();
  this.cargarCalles();
  this.cargarLocalidades();
    // console.log('Entra en ngoninit : ', this.Correo);

  this.forma = new FormGroup({
    Escuela: new FormControl( null ),
    IdCalle: new FormControl(null),  // Si se deja en NULL, en la BD se deja como estaba
    Director: new FormControl(null ),
    IdLocalidad: new FormControl(null),
    NroCalle: new FormControl(null ),
    Estado: new FormControl(null )

  });

  console.log('this.forma actualizar : ', this.forma);

  }
// ==================================================
//  Carga los datos de la escuela
// ==================================================

cargarEscuela() {

  this.date = this.activatedRoute.snapshot.paramMap.get('IdEscuela');

  console.log('this.date 569 es : ', this.date);

  this.gestorService.dameEscuela( this.date )
             .subscribe( (resp: any) => {

              console.log('resp en profile es : ', resp);

              this.escuela = resp[0][0];
              console.log('this.escuela en escuela es : ', this.escuela);
             // console.log('this.persona en mediciones es : ', this.persona.Correo);

              this.IdEscuela = this.escuela.IdEscuela;
              this.Escuela = this.escuela.Escuela;
              this.IdCalle =  this.escuela.IdCalle;
              this.Director =  this.escuela.Director;
              this.NroCalle =  this.escuela.NroCalle;
              this.Estado =  this.escuela.Estado;
              this.Localidad =  this.escuela.Localidad;
              this.Calle =  this.escuela.Calle;


              console.log('this.Escuela en escuela es : ', this.Escuela);

            });


}

// ==================================================
//  Carga las calles dadas de alta de la BD
// ==================================================

cargarCalles() {

  // this.date = this.activatedRoute.snapshot.paramMap.get('IdEscuela');

  console.log('this.date 569 es : ', this.date);

  this.gestorService.cargarTodasCalles(  )
             .subscribe( (resp: any) => {

              console.log('resp en profile es : ', resp);

              this.calles = resp[0];
              console.log('this.persona en mediciones es : ', this.calles);


            });


}

// ==================================================
//  Carga las localidades dadas de alta de la BD
// ==================================================

cargarLocalidades() {

  // this.date = this.activatedRoute.snapshot.paramMap.get('IdEscuela');

  // console.log('this.date 569 es : ', this.date);

  this.gestorService.cargarTodasLocalidades(  )
             .subscribe( (resp: any) => {

              console.log('resp en profile es : ', resp);

              this.localidades = resp[0];
              console.log('this.persona en mediciones es : ', this.localidades);


            });


}
// =================================================
//        actualiza escuela
// ==================================================

actualizaEscuela( ) {

  console.log('Formulario valido y actualiza actualizaEscuela ingreso');

  console.log('this.forma EN actualiza actualizaEscuela ES  : ', this.forma);


  const escuela = new Escuela(
    this.IdEscuela,
    this.forma.value.IdCalle = this.forma.value.IdCalle || this.IdCalle,
    this.forma.value.IdLocalidad = this.forma.value.IdLocalidad || this.IdLocalidad,
    this.forma.value.Escuela = this.forma.value.Escuela || this.Escuela,
    this.forma.value.Director = this.forma.value.Director || this.Director,
    this.forma.value.NroCalle = this.forma.value.NroCalle || this.NroCalle,
    this.forma.value.Estado = this.forma.value.Estado || this.Estado
  );

  console.log('escuela armado en escuela.component es : ', escuela);

  this.gestorService.editarEscuela( this.IdEscuela, escuela )
             .subscribe( (resp: any) => {

             console.log('resp en editarProfesional : ', resp);

             if ( resp.Mensaje === 'Ok') {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Escuela actualizada',
                showConfirmButton: false,
                timer: 2000
              });
              this.router.navigate(['/mantenimiento/escuelas']);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Hubo un problema al actualizar',
                text: 'Contactese con el administrador',
              });
            }
          });


}


}
