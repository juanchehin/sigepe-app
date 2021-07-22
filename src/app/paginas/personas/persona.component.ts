import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { PersonaService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Persona } from 'src/app/models/persona.model';
import { Observable, Subject } from 'rxjs';
import { Localidad } from '../../models/localidad.model';


@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: []
})
export class PersonaComponent implements OnInit {

  // uploadedFiles: Array < File > ;
  uploadedFiles: string;

  forma: FormGroup;
  respuesta: any;

  localidades: any;
  calles: any;
  barrios: any;

  cargando = true;
  aparecer = false;


  constructor(
    public personaService: PersonaService,
    private router: Router
  ) {
   }


  ngOnInit() {

    // this.cargarPlanes();
    this.cargarLocalidades();
    this.cargarCalles();
    this.cargarBarrios();

    this.forma = new FormGroup({
      // Datos Padron
      DNI: new FormControl(null, Validators.required ),
      Apellidos: new FormControl(null, Validators.required ),
      Nombres: new FormControl(null, Validators.required ),
      Domicilio: new FormControl(null ),
      Localidad: new FormControl(null ),
      Departamento: new FormControl(null),
      // Datos adicionales SIGEPE
      IdCalleActual: new FormControl(null ),
      NroCalleActual: new FormControl(null),
      IdLocalidad: new FormControl(null),
      Telefono: new FormControl(null ),
      EmpresaTel: new FormControl(null ),
      Manzana: new FormControl(null ),
      Casa: new FormControl(null),
      Lote: new FormControl(null ),
      IdBarrio: new FormControl(null ),
      Observaciones: new FormControl(null )
    });

  }

// ==================================================
//        Nueva Persona
// ==================================================

  registrarPersona() {

    if ( this.forma.invalid ) {
      console.log('formulario invalido' , this.forma);
      // console.log('formulario invalido');

      return;
    }

    console.log('Formulario valido y Registrar cliente ingreso');

    const persona = new Persona(
      //   DATOS PADRON
      this.forma.value.DNI,
      this.forma.value.Apellidos,
      this.forma.value.Nombres,
      this.forma.value.Domicilio,
      this.forma.value.IdLocalidad,
      this.forma.value.Departamento,
      // DATOS ADICIONALES SIGEPE
      this.forma.value.IdCalleActual,
      this.forma.value.NroCalleActual,
      this.forma.value.IdLocalidad,
      this.forma.value.Telefono,
      this.forma.value.EmpresaTel,
      this.forma.value.Manzana,
      this.forma.value.Casa,
      this.forma.value.Lote,
      this.forma.value.IdBarrio,
      this.forma.value.Observaciones
    );
    console.log('persona armada en persona.component es : ', persona);
    this.personaService.crearPersona( persona )
              .subscribe( (resp: any) => {

                console.log('resp.message en persona subscribe es : ', resp.mensaje);

                console.log('resp en cliente subscribe es : ', resp);


                /*  Transformar resp.mensaje a JSON para que se pueda acceder*/
                if ( resp.mensaje === 'Ok') {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Persona registrada',
                    showConfirmButton: false,
                    timer: 2000
                  });
                  this.router.navigate(['/personas']);
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: resp.message,
                  });
                  return;
                }
               });
              //   if ( resp.mensaje === 'Ok') {
              //     Swal.fire({
              //       position: 'top-end',
              //       icon: 'success',
              //       title: 'Persona creada',
              //       showConfirmButton: false,
              //       timer: 2000
              //     });
              //   }
              //   this.router.navigate(['/personas']);
              // });


            }


// ==================================================
//        Carga de calles desde la BD
// ==================================================

cargarCalles() {

  this.cargando = true;

  this.personaService.dameCalles( )
             .subscribe( (resp: any) => {

              console.log('resp en cargarCalles todas en clientes.component es : ', resp);

//              this.totalClientes = resp[1][0].maximo;
              this.calles = resp;
              console.log('this.calles todas es : ', this.calles);

              this.cargando = false;

            });

}


// ==================================================
//        Carga de barrios desde la BD
// ==================================================

cargarBarrios() {

  this.cargando = true;

  this.personaService.dameBarrios( )
             .subscribe( (resp: any) => {

              console.log('resp en cargarBarrios todas en clientes.component es : ', resp);

//              this.totalClientes = resp[1][0].maximo;
              this.barrios = resp;
              console.log('this.barrios todas es : ', this.barrios);

              this.cargando = false;

            });

}


// ==================================================
//        Carga de localidades
// ==================================================

cargarLocalidades() {

  this.cargando = true;

  this.personaService.dameLocalidades( )
             .subscribe( (resp: any) => {

              console.log('resp en dameLocalidades todas en clientes.component es : ', resp);

//              this.totalClientes = resp[1][0].maximo;
              this.localidades = resp;
              console.log('this.localidades todas es : ', this.localidades);

              this.cargando = false;

            });

}

}
