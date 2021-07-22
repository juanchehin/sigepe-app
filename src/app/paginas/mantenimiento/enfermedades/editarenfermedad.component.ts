import { GestorService } from '../../../services/service.index';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';
import { FormGroup, NgForm, FormControl } from '@angular/forms';
import { Barrio } from '../../../models/barrio.model';
import { Enfermedad } from '../../../models/enfermedad.model';
declare var swal: any;

@Component({
  selector: 'app-editarenfermedad',
  templateUrl: './editarenfermedad.component.html',
  styles: []
})

export class EditarEnfermedadComponent implements OnInit {

  forma: FormGroup;
  Enfermedad: string;
  enfermedad: any;
  Estado: string;

  private IdEnfermedad: string;

  constructor(public gestorService: GestorService, private activatedRoute: ActivatedRoute, private router: Router) {
    console.log('Entra en constructor : ');
  }

  ngOnInit() {
  this.cargarEnfermedad();
    // console.log('Entra en ngoninit : ', this.Correo);

  this.forma = new FormGroup({
    Enfermedad: new FormControl(null),  // Si se deja en NULL, en la BD se deja como estaba
    Estado: new FormControl(null)
  });

  console.log('this.forma actualizar barrio : ', this.forma);

  }
// ==================================================
//  Carga la enfermedad con sus datos para mostrar en el formulario
// ==================================================

cargarEnfermedad() {

  this.IdEnfermedad = this.activatedRoute.snapshot.paramMap.get('IdEnfermedad');

  console.log('this.IdBarrio es : ', this.IdEnfermedad);

  this.gestorService.dameEnfermedad( this.IdEnfermedad )
             .subscribe( (resp: any) => {

              console.log('resp en dameEnfermedad es : ', resp);

              this.enfermedad = resp[0][0];
              console.log('this.barrio en dameEnfermedad es : ', this.enfermedad);

              this.IdEnfermedad = this.enfermedad.IdBarrio;
              this.Enfermedad = this.enfermedad.Enfermedad;
              this.Estado = this.enfermedad.Estado;

            });


}
// =================================================
//        actualiza Enfermedad
// ==================================================

actualizaEnfermedad( ) {
  console.log('Formulario valido y actualiza actualizaEnfermedad ingreso');

  console.log('this.forma EN actualiza actualizaEnfermedad ES  : ', this.forma);
  // console.log('this.Correo actualizar : ', this.Correo);


  const enfermedad = new Enfermedad(
    this.IdEnfermedad,
    this.forma.value.Enfermedad = this.forma.value.Enfermedad || this.Enfermedad,
    this.forma.value.Estado = this.forma.value.Estado || this.Estado
  );

  console.log('barrio armado en enfermedad.component es : ', enfermedad);

  this.gestorService.editarEnfermedad( this.IdEnfermedad , enfermedad )
             .subscribe( (resp: any) => {

             console.log('resp en editarEnfermedad : ', resp);

             if ( resp.Mensaje === 'Ok') {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Enfermedad actualizada',
                showConfirmButton: false,
                timer: 2000
              });
              this.router.navigate(['/mantenimiento/enfermedades']);
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
