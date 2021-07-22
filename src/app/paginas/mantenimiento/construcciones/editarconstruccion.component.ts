import { GestorService } from '../../../services/service.index';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';
import { FormGroup, NgForm, FormControl } from '@angular/forms';
import { Construccion } from '../../../models/construccion.model';
declare var swal: any;

@Component({
  selector: 'app-editarconstruccion',
  templateUrl: './editarconstruccion.component.html',
  styles: []
})

export class EditarConstruccionComponent implements OnInit {

  forma: FormGroup;
  Construccion: string;
  construccion: any;
  IdConstruccion: any;
  Estado: string;
  private IdBarrio: string;

  constructor(public gestorService: GestorService, private activatedRoute: ActivatedRoute, private router: Router) {
    console.log('Entra en constructor : ');
  }

  ngOnInit() {
  this.cargarConstruccion();
    // console.log('Entra en ngoninit : ', this.Correo);

  this.forma = new FormGroup({
    Construccion: new FormControl(null),  // Si se deja en NULL, en la BD se deja como estaba
    Estado: new FormControl(null)
  });

  console.log('this.forma actualizar barrio : ', this.forma);

  }
// ==================================================
//  Carga la Construccion con sus datos para mostrar en el formulario
// ==================================================

cargarConstruccion() {

  this.IdConstruccion = this.activatedRoute.snapshot.paramMap.get('IdConstruccion');

  console.log('this.IdConstruccion es : ', this.IdConstruccion);

  this.gestorService.dameConstruccion( this.IdConstruccion )
             .subscribe( (resp: Construccion) => {

              console.log('resp en dameIdConstruccion es : ', resp);

              this.construccion = resp[0][0];
              console.log('this.Construccion en dameConstruccion es : ', this.construccion);

              this.IdConstruccion = this.construccion.IdConstruccion;
              this.Construccion = this.construccion.Construccion;
              this.Estado = this.construccion.Estado;

            });


}
// =================================================
//        actualiza Construccion
// ==================================================

actualizaConstruccion( ) {
  console.log('Formulario valido y actualiza Construccion ingreso');

  console.log('this.forma EN actualiza Construccion ES  : ', this.forma);
  // console.log('this.Correo actualizar : ', this.Correo);


  const construccion = new Construccion(
    this.IdConstruccion,
    this.forma.value.Construccion = this.forma.value.Construccion || this.Construccion,
    this.forma.value.Estado = this.forma.value.Estado || this.Estado
  );

  console.log('construccion armado en construccion.component es : ', construccion);

  this.gestorService.editarConstruccion( this.IdConstruccion , construccion )
             .subscribe( (resp: any) => {

             console.log('resp en editarConstruccion : ', resp);

             if ( resp.Mensaje === 'Ok') {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Construccion actualizada',
                showConfirmButton: false,
                timer: 2000
              });
              this.router.navigate(['/mantenimiento/construcciones']);
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
