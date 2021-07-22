import { GestorService } from '../../../services/service.index';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';
import { FormGroup, NgForm, FormControl } from '@angular/forms';
import { Inmueble } from 'src/app/models/inmueble.model';
declare var swal: any;

@Component({
  selector: 'app-editarinmueble',
  templateUrl: './editarinmueble.component.html',
  styles: []
})

export class EditarInmuebleComponent implements OnInit {

  forma: FormGroup;
  Inmueble: string;
  inmueble: any;
  Estado: string;
  private IdInmueble: string;

  constructor(public gestorService: GestorService, private activatedRoute: ActivatedRoute, private router: Router) {
    console.log('Entra en constructor : ');
  }

  ngOnInit() {
  this.cargarInmueble();
    // console.log('Entra en ngoninit : ', this.Correo);

  this.forma = new FormGroup({
    Inmueble: new FormControl(null), // Si se deja en NULL, en la BD se deja como estaba
    Estado: new FormControl(null)
  });

  console.log('this.forma actualizar Inmueble : ', this.forma);

  }
// ==================================================
//  Carga el Inmueble con sus datos para mostrar en el formulario
// ==================================================

cargarInmueble() {

  this.IdInmueble = this.activatedRoute.snapshot.paramMap.get('IdInmueble');

  console.log('this.IdInmueble es : ', this.IdInmueble);

  this.gestorService.dameInmueble( this.IdInmueble )
             .subscribe( (resp: any) => {

              console.log('resp en dameInmueble es : ', resp);

              this.inmueble = resp[0][0];
              console.log('this.inmueble en dame inmueble es : ', this.inmueble);

              this.IdInmueble = this.inmueble.IdSituacionInmueble;
              this.Inmueble = this.inmueble.SituacionInmueble;
              this.Estado = this.inmueble.Estado;

            });


}
// =================================================
//        actualiza Inmueble
// ==================================================

actualizaInmueble( ) {
  console.log('Formulario valido y actualiza profesional ingreso');

  console.log('this.forma EN actualiza ENTRENADOR ES  : ', this.forma);
  // console.log('this.Correo actualizar : ', this.Correo);


  const inmueble = new Inmueble(
    this.IdInmueble,
    this.forma.value.Inmueble = this.forma.value.Inmueble || this.Inmueble,
    this.forma.value.Estado = this.forma.value.Estado || this.Estado
  );

  console.log('inmueble armado en inmueble.component es : ', inmueble);

  this.gestorService.editarInmueble( this.IdInmueble , inmueble )
             .subscribe( (resp: any) => {

             console.log('resp en editarInmueble : ', resp);

             if ( resp.Mensaje === 'Ok') {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Situacion de inmueble actualizada',
                showConfirmButton: false,
                timer: 2000
              });
              this.router.navigate(['/mantenimiento/inmuebles']);
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
