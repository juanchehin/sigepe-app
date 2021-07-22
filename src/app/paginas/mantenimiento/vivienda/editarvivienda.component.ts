import { GestorService } from '../../../services/service.index';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';
import { FormGroup, NgForm, FormControl } from '@angular/forms';
import { Barrio } from '../../../models/barrio.model';
import { Vivienda } from 'src/app/models/vivienda.model';
declare var swal: any;

@Component({
  selector: 'app-editarvivienda',
  templateUrl: './editarvivienda.component.html',
  styles: []
})

export class EditarViviendaComponent implements OnInit {

  forma: FormGroup;
  Vivienda: string;
  vivienda: any;
  Estado: string;
  private IdVivienda: string;

  constructor(public gestorService: GestorService, private activatedRoute: ActivatedRoute, private router: Router) {
    console.log('Entra en constructor : ');
  }

  ngOnInit() {
  this.cargarVivienda();
    // console.log('Entra en ngoninit : ', this.Correo);

  this.forma = new FormGroup({
    Barrio: new FormControl(null),  // Si se deja en NULL, en la BD se deja como estaba
    Estado: new FormControl(null)
  });

  console.log('this.forma actualizar barrio : ', this.forma);

  }
// ==================================================
//  Carga la Vivienda con sus datos para mostrar en el formulario
// ==================================================

cargarVivienda() {

  this.IdVivienda = this.activatedRoute.snapshot.paramMap.get('IdVivienda');

  console.log('this.IdVivienda es : ', this.IdVivienda);

  this.gestorService.dameBarrio( this.IdVivienda )
             .subscribe( (resp: Barrio) => {

              console.log('resp en dameBarrio es : ', resp);

              this.vivienda = resp[0][0];
              console.log('this.vivienda en dameBarrio es : ', this.vivienda);

              this.IdVivienda = this.vivienda.IdBarrio;
              this.Vivienda = this.vivienda.Barrio;
              this.Estado = this.vivienda.Estado;
            });


}
// =================================================
//        actualiza Vivienda
// ==================================================

actualizaVivienda( ) {
  console.log('Formulario valido y actualiza Vivienda ingreso');

  console.log('this.forma EN actualiza Vivienda ES  : ', this.forma);
  // console.log('this.Correo actualizar : ', this.Correo);


  const vivienda = new Vivienda(
    this.IdVivienda,
    this.forma.value.Vivienda = this.forma.value.Vivienda || this.Vivienda,
    this.forma.value.Estado = this.forma.value.Estado || this.Estado
  );

  console.log('Vivienda armado en Vivienda.component es : ', vivienda);

  this.gestorService.editarVivienda( this.IdVivienda , vivienda )
             .subscribe( (resp: any) => {

             console.log('resp en editarVivienda : ', resp);

             if ( resp.Mensaje === 'Ok') {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Vivienda actualizada',
                showConfirmButton: false,
                timer: 2000
              });
              this.router.navigate(['/mantenimiento/viviendas']);
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
