import { GestorService } from '../../../services/service.index';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';
import { FormGroup, NgForm, FormControl } from '@angular/forms';
import { Barrio } from '../../../models/barrio.model';
import { LugarTrabajo } from 'src/app/models/lugartrabajo.model';
declare var swal: any;

@Component({
  selector: 'app-editarlugartrabajo',
  templateUrl: './editarlugartrabajo.component.html',
  styles: []
})

export class EditarLugarComponent implements OnInit {

  forma: FormGroup;
  Lugar: string;
  lugar: any;
  Estado: string;
  private IdLugar: string;

  constructor(public gestorService: GestorService, private activatedRoute: ActivatedRoute, private router: Router) {
    console.log('Entra en constructor : ');
  }

  ngOnInit() {
  this.cargarLugar();
    // console.log('Entra en ngoninit : ', this.Correo);

  this.forma = new FormGroup({
    Lugar: new FormControl(null),
    Estado: new FormControl(null)  // Si se deja en NULL, en la BD se deja como estaba

  });

  console.log('this.forma actualizar barrio : ', this.forma);

  }
// ==================================================
//  Carga el lugar con sus datos para mostrar en el formulario
// ==================================================

cargarLugar() {

  this.IdLugar = this.activatedRoute.snapshot.paramMap.get('IdLugar');

  console.log('this.IdLugar es : ', this.IdLugar);

  this.gestorService.dameLugarTrabajo( this.IdLugar )
             .subscribe( (resp: any) => {

              console.log('resp en dameLugarTrabajo es : ', resp);

              this.lugar = resp[0][0];
              console.log('this.lugar en dameLugar es : ', this.lugar);

              this.IdLugar = this.lugar.IdLugarTrabajo;
              this.Lugar = this.lugar.LugarTrabajo;
              this.Estado = this.lugar.Estado;
            });


}
// =================================================
//        actualiza lugar
// ==================================================

actualizaLugar( ) {
  console.log('Formulario valido y actualiza lugar ingreso');

  console.log('this.forma EN actualiza lugar ES  : ', this.forma);
  // console.log('this.Correo actualizar : ', this.Correo);


  const lugar = new LugarTrabajo(
    this.IdLugar,
    this.forma.value.Lugar = this.forma.value.Lugar || this.Lugar,
    this.forma.value.Estado = this.forma.value.Estado || this.Estado
  );

  console.log('barrio armado en lugar.component es : ', lugar);

  this.gestorService.editarLugaresTrabajo( this.IdLugar , lugar )
             .subscribe( (resp: any) => {

             console.log('resp en editarLugar : ', resp);

             if ( resp.Mensaje === 'Ok') {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Lugar actualizado',
                showConfirmButton: false,
                timer: 2000
              });
              this.router.navigate(['/mantenimiento/lugarestrabajo']);
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
