import { GestorService } from '../../../services/service.index';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';
import { FormGroup, NgForm, FormControl } from '@angular/forms';
import { Calle } from '../../../models/calle.model';
declare var swal: any;

@Component({
  selector: 'app-editarcalle',
  templateUrl: './editarcalle.component.html',
  styles: []
})

export class EditarCalleComponent implements OnInit {

  forma: FormGroup;
  Calle: string;
  calle: any;
  Estado: string;
  private IdCalle: string;

  constructor(public gestorService: GestorService, private activatedRoute: ActivatedRoute, private router: Router) {
    console.log('Entra en constructor : ');
  }

  ngOnInit() {
  this.cargarCalle();
    // console.log('Entra en ngoninit : ', this.Correo);

  this.forma = new FormGroup({
    Calle: new FormControl(null),  // Si se deja en NULL, en la BD se deja como estaba
    Estado: new FormControl(null)
  });

  console.log('this.forma actualizar barrio : ', this.forma);

  }
// ==================================================
//  Carga la calle con sus datos para mostrar en el formulario
// ==================================================

cargarCalle() {

  this.IdCalle = this.activatedRoute.snapshot.paramMap.get('IdCalle');

  console.log('this.IdCalle es : ', this.IdCalle);

  this.gestorService.dameCalle( this.IdCalle )
             .subscribe( (resp: Calle) => {

              console.log('resp en dameBarrio es : ', resp);

              this.calle = resp[0][0];
              console.log('this.calle en dameBarrio es : ', this.calle);

              this.IdCalle = this.calle.IdCalle;
              this.Calle = this.calle.Calle;
              this.Estado = this.calle.Estado;

            });


}
// =================================================
//        actualiza Calle
// ==================================================

actualizaCalle( ) {
  console.log('Formulario valido y actualiza Calle ingreso');

  console.log('this.forma EN actualiza Calle ES  : ', this.forma);
  // console.log('this.Correo actualizar : ', this.Correo);


  const calle = new Calle(
    this.IdCalle,
    this.forma.value.Calle = this.forma.value.Calle || this.Calle,
    this.forma.value.Estado = this.forma.value.Estado || this.Estado
  );

  console.log('calle armado en calle.component es : ', calle);

  this.gestorService.editarCalle( this.IdCalle , calle )
             .subscribe( (resp: any) => {

             console.log('resp en editarCalle: ', resp);

             if ( resp.Mensaje === 'Ok') {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Calle actualizada',
                showConfirmButton: false,
                timer: 2000
              });
              this.router.navigate(['/mantenimiento/calles']);
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
