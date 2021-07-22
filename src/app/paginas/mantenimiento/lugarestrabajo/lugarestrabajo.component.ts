import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
// import { UsuarioService, PersonaService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { Localidad } from '../../../models/localidad.model';
import { GestorService } from 'src/app/services/service.index';
import { LugarTrabajo } from 'src/app/models/lugartrabajo.model';


@Component({
  selector: 'app-lugarestrabajo',
  templateUrl: './lugarestrabajo.component.html',
  styleUrls: []
})
export class LugaresTrabajoComponent implements OnInit {

  forma: FormGroup;


  constructor(
    public gestorService: GestorService,
    private router: Router
  ) {
   }


  ngOnInit() {

    this.forma = new FormGroup({
      LugarTrabajo: new FormControl(null, Validators.required )
    });
  }

// ==================================================
//        Nueva lugar de trabajo
// ==================================================

  nuevoLugar() {

    if ( this.forma.invalid ) {
      console.log('formulario invalido' , this.forma);
      return;
    }

    console.log('Formulario valido y Registrar cliente ingreso');

    const lugar = new LugarTrabajo(
        null,
        this.forma.value.LugarTrabajo,
        null
    );

    this.gestorService.crearLugarTrabajo( lugar )
              .subscribe( (resp: any) => {

                console.log('resp.message en crearLugarTrabajo es : ', resp.mensaje);

                console.log('resp en crearLugarTrabajo es : ', resp);


                /*  Transformar resp.mensaje a JSON para que se pueda acceder*/

                if ( resp.Mensaje === 'Ok') {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Lugar creado',
                    showConfirmButton: false,
                    timer: 2000
                  });
                  this.router.navigate(['/mantenimiento/lugarestrabajo']);
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error al crear',
                    text: 'Contactese con el administrador',
                  });
                  return;
                }
               });

            }

}
