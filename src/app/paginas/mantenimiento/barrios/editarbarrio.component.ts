import { GestorService } from '../../../services/service.index';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';
import { FormGroup, NgForm, FormControl } from '@angular/forms';
import { Barrio } from '../../../models/barrio.model';
declare var swal: any;

@Component({
  selector: 'app-editarbarrio',
  templateUrl: './editarbarrio.component.html',
  styles: []
})

export class EditarBarrioComponent implements OnInit {

  forma: FormGroup;
  Barrio: string;
  barrio: any;
  Estado: string;

  private IdBarrio: string;

  constructor(public gestorService: GestorService, private activatedRoute: ActivatedRoute, private router: Router) {
    console.log('Entra en constructor : ');
  }

  ngOnInit() {
  this.cargarBarrio();
    // console.log('Entra en ngoninit : ', this.Correo);

  this.forma = new FormGroup({
    Barrio: new FormControl(null),  // Si se deja en NULL, en la BD se deja como estaba
    Estado: new FormControl(null)
  });

  console.log('this.forma actualizar barrio : ', this.forma);

  }
// ==================================================
//  Carga el barrio con sus datos para mostrar en el formulario
// ==================================================

cargarBarrio() {

  this.IdBarrio = this.activatedRoute.snapshot.paramMap.get('IdBarrio');

  console.log('this.IdBarrio es : ', this.IdBarrio);

  this.gestorService.dameBarrio( this.IdBarrio )
             .subscribe( (resp: Barrio) => {

              console.log('resp en dameBarrio es : ', resp);

              this.barrio = resp[0][0];
              console.log('this.barrio en dameBarrio es : ', this.barrio);

              this.IdBarrio = this.barrio.IdBarrio;
              this.Barrio = this.barrio.Barrio;
              this.Estado = this.barrio.Estado;

            });


}
// =================================================
//        actualiza barrio
// ==================================================

actualizaBarrio( ) {
  console.log('Formulario valido y actualiza profesional ingreso');

  console.log('this.forma EN actualiza ENTRENADOR ES  : ', this.forma);
  // console.log('this.Correo actualizar : ', this.Correo);


  const barrio = new Barrio(
    this.IdBarrio,
    this.forma.value.Barrio = this.forma.value.Barrio || this.Barrio,
    this.forma.value.Estado = this.forma.value.Estado || this.Estado
  );

  console.log('barrio armado en barrio.component es : ', barrio);

  this.gestorService.editarBarrio( this.IdBarrio , barrio )
             .subscribe( (resp: any) => {

             console.log('resp en editarBarrio : ', resp);

             if ( resp.Mensaje === 'Ok') {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Barrio actualizado',
                showConfirmButton: false,
                timer: 2000
              });
              this.router.navigate(['/mantenimiento/barrios']);
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
