import { GestorService } from '../../../services/service.index';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ModuloAlimenticio } from 'src/app/models/moduloAlimanticio.model';
declare var swal: any;

@Component({
  selector: 'app-editarmoduloalimencicio',
  templateUrl: './editarmoduloalimenticio.component.html',
  styles: []
})

export class EditarModuloAlimenticioComponent implements OnInit {

  forma: FormGroup;
  ModuloAlimenticio: string;
  moduloA: any;
  Estado: string;
  Observaciones: string;
  private IdModuloAlimencitio: string;

  constructor(public gestorService: GestorService, private activatedRoute: ActivatedRoute, private router: Router) {
    console.log('Entra en constructor : ');
  }

  ngOnInit() {
  this.cargarModuloAlimenticio();
    // console.log('Entra en ngoninit : ', this.Correo);

  this.forma = new FormGroup({
    ModuloAlimenticio: new FormControl(null),
    Observaciones: new FormControl(null),
    Estado: new FormControl(null)  // Si se deja en NULL, en la BD se deja como estaba

  });

  console.log('this.forma actualizar barrio : ', this.forma);

  }
// ==================================================
//  Carga el modulo alimencitio
// ==================================================

cargarModuloAlimenticio() {

  this.IdModuloAlimencitio = this.activatedRoute.snapshot.paramMap.get('IdModuloAlimenticio');

  console.log('this.IdModuloAlimencitio es : ', this.IdModuloAlimencitio);

  this.gestorService.dameModuloAlimenticio( this.IdModuloAlimencitio )
             .subscribe( (resp: any) => {

              console.log('resp en cargarModuloAlimenticio es : ', resp);

              this.moduloA = resp[0][0];
              console.log('this.moduloA en damemoduloAes : ', this.moduloA);

              this.IdModuloAlimencitio = this.moduloA.IdModuloAlimenticio;
              this.ModuloAlimenticio = this.moduloA.Modulo;
              this.Observaciones = this.moduloA.Observaciones;
              this.Estado = this.moduloA.Estado;
            });
}
// =================================================
//        actualiza modulo alimencio
// ==================================================

actualizaModuloAlimenticio( ) {
  console.log('Formulario valido y actualiza lugar ingreso');

  console.log('this.forma EN actualiza lugar ES  : ', this.forma);
  // console.log('this.Correo actualizar : ', this.Correo);


  const moduloAlimenticio = new ModuloAlimenticio(
    this.IdModuloAlimencitio,
    this.forma.value.Lugar = this.forma.value.ModuloAlimenticio || this.ModuloAlimenticio,
    this.forma.value.Observaciones = this.forma.value.Observaciones || this.Observaciones,
    this.forma.value.Estado = this.forma.value.Estado || this.Estado
  );

  console.log('Modulo alimenticio armado en moduloAlimenticio.component es : ', moduloAlimenticio);

  this.gestorService.editarModuloAlimenticio( this.IdModuloAlimencitio , moduloAlimenticio )
             .subscribe( (resp: any) => {

             console.log('resp en editarModuloA : ', resp);

             if ( resp.Mensaje === 'Ok') {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Modulo actualizado',
                showConfirmButton: false,
                timer: 2000
              });
              this.router.navigate(['/mantenimiento/modulosalimenticios']);
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
