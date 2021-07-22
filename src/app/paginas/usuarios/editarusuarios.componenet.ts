import { Component, OnInit } from '@angular/core';
import { Persona } from '../../models/persona.model';
import { SocioEconomico } from '../../models/socioeconomico.model';
import { GestorService, PersonaService, UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';


@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styles: []
})
export class EditarUsuarioComponent implements OnInit {

    IdUsuario: any;  // id del Usuario
    Usuario: string;
    forma: FormGroup;
    Rol: any;
    LugarTrabajo: any;
    Apellidos: any;
    Nombres: any;
    IdRol: any;
    IdLugarTrabajo: any;
    Telefono: any;
    Mail: any;

    roles: any;
    lugaresTrabajo: any;
    datosUsuario: any;

    banderaUsuario = false;
    banderaRol = false;
    banderaLugarTrabajo = false;
    banderaApellidos = false;
    banderaNombres = false;
    banderaContrasena = false;
    banderaTelefono = false;
    banderaMail = false;


  constructor(
    public personaService: PersonaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public usuarioService: UsuarioService,
    public gestorService: GestorService
  ) {
   }

  ngOnInit() {
    this.cargarLugaresTrabajo();
    this.cargarRoles();
    this.cargarDatosUsuario();


    this.forma = new FormGroup({
        IdRol: new FormControl(null ),
        IdLugarTrabajo: new FormControl(null ),
        Usuario: new FormControl(null ),
        Password: new FormControl(null ),
        Password1: new FormControl(null ),
        Apellidos: new FormControl(null),
        Nombres: new FormControl(null ),
        Telefono: new FormControl(null),
        Mail: new FormControl(null)
    },
    { validators: this.sonIguales('Password' , 'Password1') });
    // console.log('this.forma es : ', this.forma);
  }

// ==================================================
//  Carga los datos del usuario para mostrar en el formulario
// ==================================================

cargarDatosUsuario() {

    this.IdUsuario = this.activatedRoute.snapshot.paramMap.get('IdUsuario');  // Id de el usuario
    console.log('this.IdUsuario cargarDatosUsuario es : ', this.IdUsuario);

    this.usuarioService.dameDatosUsuario( this.IdUsuario )
               .subscribe( (resp: any) => {

                console.log('resp en cargarDatosUsuario es : ', resp);

                this.datosUsuario = resp[0][0];
                console.log('this.datosUsuario en cargarDatosUsuario es : ', this.datosUsuario);

                this.Usuario = this.datosUsuario.Usuario;
                this.LugarTrabajo =  this.datosUsuario.LugarTrabajo;
                this.Apellidos =  this.datosUsuario.Apellidos;
                this.Nombres = this.datosUsuario.Nombres;
                this.Rol = this.datosUsuario.Rol;
                this.IdRol = this.datosUsuario.IdRol;
                this.IdLugarTrabajo = this.datosUsuario.IdLugarTrabajo;
                this.Telefono = this.datosUsuario.Telefono;
                this.Mail = this.datosUsuario.Mail;

              });

    }


// =================================================
//   Actualiza un usuario
// ==================================================

actualizaUsuario( ) {
  console.log('Formulario valido y actualiza usuario ingreso');

  console.log('this.forma actualizaUsuario ES  : ', this.forma);
  // console.log('this.Correo actualizar : ', this.Correo);


  const usuario = new Usuario(
    this.forma.value.IdRol = this.forma.value.IdRol || this.IdRol,
    this.forma.value.IdLugarTrabajo = this.forma.value.IdLugarTrabajo || this.IdLugarTrabajo,
    this.forma.value.Usuario = this.forma.value.Usuario || this.Usuario,
    this.forma.value.Password = this.forma.value.Password,
    this.forma.value.Apellidos = this.forma.value.Apellidos || this.Apellidos,
    this.forma.value.Nombres = this.forma.value.Nombres || this.Nombres,
    this.forma.value.Telefono = this.forma.value.Telefono || this.Telefono,
    this.forma.value.Mail = this.forma.value.Mail || this.Mail,
    this.IdUsuario
    // this.forma.value.IdUsuario = this.forma.value.EstudiosCursados || this.EstudiosCursados,
  );

  console.log('usuario armado en actualizaUsuario.component es : ', usuario);

  this.usuarioService.editarUsuario( usuario )
             .subscribe( (resp: any) => {

              console.log('actualizaUsuario resp : ' , resp);

              if ( resp.message === 'Ok') {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Usuario actualizado',
                  showConfirmButton: false,
                  timer: 2000
                });
                this.router.navigate(['/usuarios']);
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


// ==================================================
//        Carga de Roles desde la BD
// ==================================================

cargarRoles() {
  console.log('ENtro en cargarROles');
  this.usuarioService.dameRoles( )
             .subscribe( (resp: any) => {

              console.log('resp en dameRoles todas en clientes.component es : ', resp);

              // this.totalRoles = resp[1][0].maximo;
              this.roles = resp;
              console.log('this.roles todas es : ', this.roles);


         });

}

// ==================================================
//        Carga de lugares de trabajo desde la BD
// ==================================================
cargarLugaresTrabajo() {
 console.log('ENtro en cargarLugaresTrabajo');
 this.gestorService.cargarTodosLugaresTrabajo( )
             .subscribe( (resp: any) => {
              console.log('resp en dameLugaresTrabajo todas en clientes.component es : ', resp);

              // this.totalLugaresTrabajo = resp[1][0].maximo;
              this.lugaresTrabajo = resp[0];
              console.log('this.lugaresTrabajo todas es : ', this.lugaresTrabajo);
            });

}

// ==================================================
//        Controla que las contraseñas sean iguales
// ==================================================
sonIguales( campo1: string, campo2: string ) {

  return ( group: FormGroup ) => {

    const pass1 = group.controls[campo1].value;
    const pass2 = group.controls[campo2].value;

    if ( pass1 === pass2 ) {
      return null;
    }

    return {
      sonIguales: true
    };
  };
}

// ==================================================
// Modifica la bandera de roles
// ==================================================

modificaBanderaRol() {

  if (this.banderaRol === false) {
  this.banderaRol = true;
  } else {
   this.banderaRol = false;
  }
}


// ==================================================
// Modifica la bandera de barrio
// ==================================================

modificaBanderaLugarTrabajo() {

  if (this.banderaLugarTrabajo === false) {
  this.banderaLugarTrabajo = true;
  } else {
   this.banderaLugarTrabajo = false;
  }
}

// ==================================================
// Modifica la bandera de contraseña
// ==================================================

modificaBanderaContrasena() {

  if (this.banderaContrasena === false) {
  this.banderaContrasena = true;
  } else {
   this.banderaContrasena = false;
  }
}

// ==================================================
// Modifica la bandera de usuario
// ==================================================

modificaBanderaUsuario() {

  if (this.banderaUsuario === false) {
  this.banderaUsuario = true;
  } else {
   this.banderaUsuario = false;
  }
}

// ==================================================
// Modifica la bandera de usuario
// ==================================================

modificaBanderaApellidos() {

    if (this.banderaApellidos === false) {
    this.banderaApellidos = true;
    } else {
     this.banderaApellidos = false;
    }
  }

// ==================================================
// Modifica la bandera de nombres
// ==================================================

modificaBanderaNombres() {

    if (this.banderaNombres === false) {
    this.banderaNombres = true;
    } else {
     this.banderaNombres = false;
    }
  }

// ==================================================
// Modifica la bandera telefono
// ==================================================

modificaBanderaTelefono() {

  if (this.banderaTelefono === false) {
  this.banderaTelefono = true;
  } else {
   this.banderaTelefono = false;
  }
}

// ==================================================
// Modifica la bandera de Mail
// ==================================================

modificaBanderaMail() {

  if (this.banderaMail === false) {
  this.banderaMail = true;
  } else {
   this.banderaMail = false;
  }
}


}
