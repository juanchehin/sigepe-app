import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService, PersonaService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../models/usuario.model';
import { Observable, Subject } from 'rxjs';
import { Localidad } from '../../models/localidad.model';
import { GestorService } from '../../services/gestor/gestor.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: []
})
export class UsuarioComponent implements OnInit {

  forma: FormGroup;

  roles: any;
  lugaresTrabajo: any;

  totalLugaresTrabajo = 0;
  totalRoles = 0;

  constructor(
    public usuarioService: UsuarioService,
    private router: Router,
    private gestorService: GestorService
  ) {
   }


  ngOnInit() {

    this.cargarLugaresTrabajo();
    this.cargarRoles();

    this.forma = new FormGroup({
      // Datos Padron
      IdRol: new FormControl(null, Validators.required ),
      IdLugarTrabajo: new FormControl(null, Validators.required ),
      Usuario: new FormControl(null, Validators.required ),
      Password: new FormControl(null, Validators.required ),
      Password1: new FormControl(null, Validators.required ),
      Apellidos: new FormControl(null ),
      Nombres: new FormControl(null),
      Telefono: new FormControl(null),
      Email: new FormControl(null,Validators.email)

    },
    { validators: this.sonIguales('Password' , 'Password1') });

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
//        Nuevo Usuario
// ==================================================

registrarUsuario() {

    if ( this.forma.invalid ) {
      console.log('formulario invalido' , this.forma);
      // console.log('formulario invalido');

      return;
    }

    console.log('Formulario valido y Registrar cliente ingreso');

    const usuario = new Usuario(
      this.forma.value.IdRol,
      this.forma.value.IdLugarTrabajo,
      this.forma.value.Usuario,
      this.forma.value.Password,
      this.forma.value.Apellidos,
      this.forma.value.Nombres,
      this.forma.value.Telefono,
      this.forma.value.Email
    );

    this.usuarioService.crearUsuario( usuario )
              .subscribe( (resp: any) => {

                console.log('resp.message en crearUsuario es : ', resp.mensaje);

                console.log('resp en crearUsuario es : ', resp);


                /*  Transformar resp.mensaje a JSON para que se pueda acceder*/

                if ( resp.mensaje === 'Ok') {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Usuario creado',
                    showConfirmButton: false,
                    timer: 2000
                  });
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'No se cargo el Usuario',
                    text:  'No se cargo el Usuario'
                });
                  return false;
                }
                this.router.navigate(['/usuarios']);
              });


}


// ==================================================
//        Carga de Roles desde la BD
// ==================================================

cargarRoles() {

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

  this.gestorService.cargarTodosLugaresTrabajo( )
             .subscribe( (resp: any) => {

              console.log('resp en dameLugaresTrabajo todas en clientes.component es : ', resp);

              this.lugaresTrabajo = resp[0];

            });

}

}
