import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { GestorService } from 'src/app/services/service.index';
import { Vivienda } from 'src/app/models/vivienda.model';


@Component({
  selector: 'app-vivienda',
  templateUrl: './vivienda.component.html',
  styleUrls: []
})
export class ViviendaComponent implements OnInit {

  forma: FormGroup;


  constructor(
    public gestorService: GestorService,
    private router: Router
  ) {
   }


  ngOnInit() {

    this.forma = new FormGroup({
      Vivienda: new FormControl(null, Validators.required )
    });
  }

// ==================================================
//        Nueva Vivienda
// ==================================================

  nuevaVivienda() {

    if ( this.forma.invalid ) {
      console.log('formulario invalido' , this.forma);
      return;
    }

    console.log('Formulario valido y Registrar Vivienda ingreso');

    const vivienda = new Vivienda(
        null,
        this.forma.value.Vivienda,
        null
    );
    console.log('vivienda armada es ', vivienda);
    this.gestorService.crearVivienda( vivienda )
              .subscribe( (resp: any) => {

                console.log('resp.message en crearViviendaes : ', resp.mensaje);

                console.log('resp en crearVivienda es : ', resp);


                /*  Transformar resp.mensaje a JSON para que se pueda acceder*/

                if ( resp.Mensaje === 'Ok') {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Vivienda creada',
                    showConfirmButton: false,
                    timer: 2000
                  });
                  this.router.navigate(['/mantenimiento/viviendas']);
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Contactese con el administrador',
                  });
                  return;
                }
               });


            }

}
