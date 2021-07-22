import { GestorService } from '../../../services/service.index';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';
import { FormGroup, NgForm, FormControl } from '@angular/forms';
import { TipoVivienda } from '../../../models/tipovivienda.model';
declare var swal: any;

@Component({
  selector: 'app-editartipovivienda',
  templateUrl: './editartipovivienda.component.html',
  styles: []
})

export class EditarTipoViviendaComponent implements OnInit {

  forma: FormGroup;
  TipoVivienda: string;
  tipoVivienda: any;
  Estado: string;

  private IdTipoVivienda: string;

  constructor(public gestorService: GestorService, private activatedRoute: ActivatedRoute, private router: Router) {
    console.log('Entra en constructor : ');
  }

  ngOnInit() {
  this.cargarTiposViviendas();
    // console.log('Entra en ngoninit : ', this.Correo);

  this.forma = new FormGroup({
    TipoVivienda: new FormControl(null),
    Estado: new FormControl(null)
  });

  console.log('this.forma actualizar barrio : ', this.forma);

  }
// ==================================================
//  Carga los tipos de vivienda con sus datos para mostrar en el formulario
// ==================================================

cargarTiposViviendas() {

  this.IdTipoVivienda = this.activatedRoute.snapshot.paramMap.get('IdTipoVivienda');

  console.log('this.IdTipoVivienda es : ', this.IdTipoVivienda);

  this.gestorService.dameTipovivienda( this.IdTipoVivienda )
             .subscribe( (resp: any) => {

              console.log('resp en dameTipovivienda es : ', resp);

              this.tipoVivienda = resp[0][0];
              console.log('this.tipoVivienda en dameTipovivienda es : ', this.tipoVivienda);

              this.IdTipoVivienda = this.tipoVivienda.IdTipoVivienda;
              this.TipoVivienda = this.tipoVivienda.Vivienda;
              this.Estado = this.tipoVivienda.Estado;

            });

}
// =================================================
//        Actualiza tipo de vivienda
// ==================================================

actualizaTipoVivienda( ) {
  console.log('Formulario valido y actualiza editarTipoVivienda ingreso');

  console.log('this.forma EN actualiza editarTipoVivienda ES  : ', this.forma);
  // console.log('this.Correo actualizar : ', this.Correo);


  const tipovivienda = new TipoVivienda(
    this.IdTipoVivienda,
    this.forma.value.TipoVivienda = this.forma.value.TipoVivienda || this.TipoVivienda,
    this.forma.value.Estado = this.forma.value.Estado || this.Estado
  );

  console.log('tipovivienda armado en tipovivienda.component es : ', tipovivienda);

  this.gestorService.editarTipoVivienda( this.IdTipoVivienda , tipovivienda )
             .subscribe( (resp: any) => {

             console.log('resp en editarTipoVivienda : ', resp);

             if ( resp.Mensaje === 'Ok') {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Tipo de vivienda actualizado',
                showConfirmButton: false,
                timer: 2000
              });
              this.router.navigate(['/mantenimiento/tiposviviendas']);
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
