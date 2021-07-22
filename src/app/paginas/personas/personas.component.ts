import { Component, OnInit } from '@angular/core';
import { Persona } from '../../models/persona.model';
import { PersonaService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario/usuario.service';

declare var swal: any;

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styles: []
})
export class PersonasComponent implements OnInit {

  padron: any;
  desde = 0;
  totalAsistencias = true;
  ApellNombr = Array;
  cargandoApNom = false;
  cargandoDNI = false;
  cargandoPadron = false;
  // tslint:disable-next-line: variable-name
  apellNomb_DNI = 1;
  ClasesDisponibles = 0;
  forma: FormGroup;
  totalPersonas = 0;
  IdRol: number;
  banderaAdmin = false;
  banderaTucuman = true;
  // banderaEmpleado = false;
  banderaApellidoNom = false;
  banderaDNI = false;
  excel: File;


  constructor(
    public personaService: PersonaService,
    private usuarioService: UsuarioService
  ) {
    this.IdRol = this.usuarioService.IdRol;

   }

  ngOnInit() {
    this.cargarPadron();
    this.banderaAdmin = this.usuarioService.comprobarRol();
    this.forma = new FormGroup({
      Apellidos: new FormControl(null ),
      Nombres: new FormControl(null )
    });
  }

// ==================================================
// Buscar una persona por apellido y nombre
// ==================================================

buscarApellNomb() {
  this.banderaDNI = false;
  this.banderaApellidoNom = true;

  this.cargandoApNom = true;
  const inputElement: HTMLInputElement = document.getElementById('buscarApellido') as HTMLInputElement;
  const Apellido: string = inputElement.value || null;

  const inputElement1: HTMLInputElement = document.getElementById('buscarNombre') as HTMLInputElement;
  const Nombre: string = inputElement1.value || null;

  console.log('Apellido es ', Apellido);
  console.log('Nombre es ', Nombre);

  this.personaService.buscarApellNombr( this.desde, Apellido, Nombre , this.banderaTucuman)
            .subscribe( (padron: any) => {
              this.cargandoApNom = false;
              console.log('personas en buscarApellNomb : ', padron);

              this.padron = padron;

            });
}


// ==================================================
// Carga de padron
// ==================================================

cargarPadron() {
  // Limpio las cajas de texto

  this.cargandoPadron = true;

  const buscarDNI: HTMLInputElement = document.getElementById('BuscarPersona') as HTMLInputElement;
  buscarDNI.value = '';

  const buscarApellido: HTMLInputElement = document.getElementById('buscarApellido') as HTMLInputElement;
  buscarApellido.value = '';

  const buscarNombre: HTMLInputElement = document.getElementById('buscarNombre') as HTMLInputElement;
  buscarNombre.value = '';


  this.personaService.cargarPadron( this.desde , this.banderaTucuman )
               .subscribe( (resp: any) => {

                console.log('resp en personas.component es : ', resp);
                this.cargandoPadron = false;
                  // Desactivado por no tener un ID la tabla Personas de PADRON
                // this.totalPersonas = resp[1][0].maximo;
                // console.log('this.totalPersonas es : ', this.totalPersonas);

                this.padron = resp[0];
                console.log('this.padron es : ', this.padron);


              });

  }


// ==================================================
//  Busca una personas por DNI
// ==================================================

buscarDNI( ) {
    this.banderaDNI = true;
    this.banderaApellidoNom = false;

    const inputElement: HTMLInputElement = document.getElementById('BuscarPersona') as HTMLInputElement;
    const dni: string = inputElement.value;

    // const termino =  (document.getElementById('BuscarCliente')).value;  // Da un error en la consola
    console.log('DNI o apellido en BuscarPersona es : ', dni);

    if ( dni.length <= 0) { // ||  this.planSeleccionado.toString() === '0') {
      console.log('Entro en el if termino.length', dni.length);

      this.cargarPadron();
      return;
    }

    console.log('No entro en el if BuscarPersona : ');


    this.cargandoDNI = true;

    this.personaService.buscarDNI( 0, dni , this.banderaTucuman )
            .subscribe( (padron: any) => {

              console.log('personas en buscarPersonas : ', padron);
              this.cargandoDNI = false;
              this.padron = padron;

            });

  }
// ==================================================
//   Modifica el valor de la bandera y actuliza el listado
// ==================================================

modificaBanderaTucuman(  ) {

  // this.banderaTucuman = false;

  if (this.banderaTucuman === false) {
    this.banderaTucuman = true;
    this.cargarPadron();
    return;
  }
  if ( this.banderaTucuman === true ) {
    this.banderaTucuman = false;
    this.cargarPadron();
    return;
 }

}

// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  this.desde += valor;

  if ( this.banderaApellidoNom ) {
    console.log('banderaApellidoNom');
    console.log('banderaApellidoNom this.desde', this.desde);
    this.buscarApellNomb();
    return;
  }
  if ( this.banderaDNI ) {
    console.log('banderaDNI');
    console.log('banderaDNI this.desde', this.desde);
    this.buscarDNI();
    return;
 }
  console.log('Llego');

  this.cargarPadron();

}

}
