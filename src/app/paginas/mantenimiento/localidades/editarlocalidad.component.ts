import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GestorService } from '../../../services/gestor/gestor.service';
import { Localidad } from 'src/app/models/localidad.model';


declare var swal: any;

@Component({
  selector: 'app-editarlocalidad',
  templateUrl: './editarlocalidad.component.html',
  styles: []
})
export class EditarLocalidadComponent implements OnInit {

    cargando = false;
    private date: any;  // id de la persona
    SocioEconomico: any;
    Localidad: any;
    forma: FormGroup;
    Estado: string;

  constructor(
    private gestorService: GestorService,
    private activatedRoute: ActivatedRoute, private router: Router
  ) {
   }

  ngOnInit() {
    this.cargarLocalidad();


    this.forma = new FormGroup({
        Localidad: new FormControl(null),
        Estado: new FormControl(null)
    });
  }

// ==================================================
//  Carga la persona con sus datos socioeconomicos para mostrar en el formulario
// ==================================================

cargarLocalidad() {

    this.date = this.activatedRoute.snapshot.paramMap.get('IdLocalidad');
    console.log('this.date cargarSocioeconomico es : ', this.date);

    // Devuelve SocioEconomico y Apellido y nombre de la persona (Para cargar en el HTML)
    this.gestorService.dameLocalidad( this.date )
               .subscribe( (resp: any) => {

                console.log('resp en dameLocalidad es : ', resp);

                this.Localidad = resp[0][0].Localidad;
                this.Estado = resp[0][0].Estado;
                console.log('this.localidad en dameLocalidad es : ', this.Localidad);
                // console.log('this.SocioEconomico en cargarDatos es : ', this.SocioEconomico.Correo);


              });

    }

// =================================================
//   Actualiza una localidad
// ==================================================

actualizaLocalidad( ) {
  console.log('Formulario valido y actualiza actualizaLocalidad ingreso');

  console.log('this.forma actualizaSocioeconomico ES  : ', this.forma);
  // console.log('this.Correo actualizar : ', this.Correo);
  const localidad = new Localidad(
        null,
        this.forma.value.Localidad = this.forma.value.Localidad || this.Localidad,
        this.forma.value.Estado = this.forma.value.Estado || this.Estado
  );


  this.gestorService.editarLocalidad( this.date, localidad )
             .subscribe( (resp: any) => {

              console.log('editarLocalidad resp : ' , resp);

              if ( resp.Mensaje === 'Ok') {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Localidad actualizada',
                  showConfirmButton: false,
                  timer: 2000
                });
                this.router.navigate(['/mantenimiento/localidades']);
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error al actualizar',
                  text: resp.message,
                });
                return;
              }
             });
}

}
