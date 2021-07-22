import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ControlService } from 'src/app/services/control/control.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Entrega } from 'src/app/models/entrega.model';
import { GestorService, PersonaService } from 'src/app/services/service.index';
declare var swal: any;

@Component({
  selector: 'app-nuevaentrega',
  templateUrl: './nuevaentrega.component.html',
  styles: []
})
export class NuevaEntregaComponent implements OnInit {

grupos: any;
desde = 0;
IdModulo: any;
modulos: any;
diasRestantes: any;
forma: FormGroup;
totalGrupos = 0;
banderaModal = false;
datosPersona: any;
IdPersona: string;
Apellidos: string;
Nombres: string;
Domicilio: string;
barrios: any;

banderaHisopado = false;

  constructor(
    public controlService: ControlService,
    public gestorService: GestorService,
    private activatedRoute: ActivatedRoute,
    public personaService: PersonaService,
    private router: Router
  ) {
   }

  ngOnInit() {
    this.cargarModulos();
    this.cargarDatosPersona();
    this.cargarBarrios();

    this.forma = new FormGroup({
        Frecuencia: new FormControl('7', Validators.required ),
        MaxEntregas: new FormControl(null, [ Validators.required , Validators.max(4) ] ),
        IdModuloAlimenticio: new FormControl(null, Validators.required ),
        DireccionEntrega: new FormControl(null),
        Hisopado: new FormControl(null ),
        Positivo: new FormControl(null ),
        Telefono: new FormControl(null ),
        Observaciones: new FormControl(null ),
        Asistencia: new FormControl(null ),
        IdBarrio: new FormControl(null ),
        AisladoPor: new FormControl(null )
      });
  }


// ==================================================
//        Carga los modulos activos de la BD
// ==================================================

cargarModulos() {

  this.gestorService.cargarModulosAlimenticiosAlta( )
             .subscribe( (resp: any) => {

              console.log('resp en cargarModulos todas en entregas.component es : ', resp);

//              this.totalClientes = resp[1][0].maximo;
              this.modulos = resp[0];
              console.log('this.modulos cargarModulos es : ', this.modulos);

            });

}

// ==================================================
//        Nueva entrega para la persona
// ==================================================

nuevaEntrega() {
    // console.log('this.forma.value.IdModulo invalido' , this.forma.value.IdModulo);
    if ( this.forma.invalid ) {
      console.log('formulario invalido' , this.forma);
      // console.log('formulario invalido');

      return;
    }

    console.log('Formulario valido y Registrar entrega ingreso');
    const entrega = new Entrega(
        null,
        this.forma.value.IdModuloAlimenticio,
        this.IdPersona,
        null,
        null,
        this.forma.value.MaxEntregas,
        this.forma.value.DireccionEntrega,
        this.forma.value.Frecuencia,
        null,
        this.forma.value.Observaciones,
        this.forma.value.IdBarrio
    );

    console.log('Formulario valido y entrega es : ', entrega);

    this.controlService.nuevaEntrega( entrega , this.forma.value.Telefono , this.forma.value.Hisopado ,
      this.forma.value.Positivo , this.forma.value.Asistencia , this.forma.value.AisladoPor )
              .subscribe( (resp: any) => {

                // console.log('resp.message en entrega es : ', resp.ensaje);

                console.log('resp en entrega es : ', resp);

                /*  Transformar resp.mensaje a JSON para que se pueda acceder*/

                if ( resp.Mensaje === 'Ok') {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Entrega Asignada',
                    showConfirmButton: false,
                    timer: 2000
                  });
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Problema al cargar',
                    text: resp.Mensaje,
                  });
                  return;
                }

                this.router.navigate(['/control/entregas/listar']);
              });


            }


// ==================================================
//  Carga los datos de la persona que necesita el pedido (para mostrar en el titulo del form)
// ==================================================

cargarDatosPersona() {

    this.IdPersona = this.activatedRoute.snapshot.paramMap.get('IdPersona');
    console.log('this.date cargarDatosPersona es : ', this.IdPersona);

    // Devuelve SocioEconomico y Apellido y nombre de la persona (Para cargar en el HTML)
    this.personaService.damePersonaPadron( this.IdPersona )
               .subscribe( (resp: any) => {

                console.log('resp en cargarDatosPersona es : ', resp);

                this.datosPersona = resp[0];
                console.log('this.datosPersona en cargarDatos es : ', this.datosPersona);
                // console.log('this.SocioEconomico en cargarDatos es : ', this.SocioEconomico.Correo);

                this.Apellidos = this.datosPersona.Apellidos;
                this.Nombres =  this.datosPersona.Nombres;
                this.Domicilio =  this.datosPersona.Domicilio;

              });

    }

// ==================================================
//        Carga de barrios desde la BD
// ==================================================

cargarBarrios() {

  this.gestorService.dameBarriosAlta( )
             .subscribe( (resp: any) => {

              console.log('resp en cargarBarrios todas en nuevaentrega.component es : ', resp);

//              this.totalClientes = resp[1][0].maximo;
              this.barrios = resp[0];
              console.log('this.barrios todas es : ', this.barrios);

            });

}

// ==================================================
// Activa la bandera de hipopado
// ==================================================


activarHisopado() {

  this.banderaHisopado = true;
  }

// ==================================================
// Activa la bandera de hipopado
// ==================================================
desactivarHisopado() {

  this.banderaHisopado = false;
  }

}
