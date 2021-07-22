import { Component, OnInit } from '@angular/core';
import { Persona } from '../../models/persona.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: any;
  desde = 0;
  cargando = false;
  totalUsuarios = 0;


  constructor(
    public usuariosService: UsuarioService
  ) {
   }

  ngOnInit() {
    this.cargarUsuarios();
  }

// ==================================================
// Carga de usuarios del sistema
// ==================================================

cargarUsuarios() {
    // console.log('seleccionado  es : ', this.estadoSeleccionado );
    this.cargando = true;

    this.usuariosService.cargarUsuarios( this.desde )
               .subscribe( (resp: any) => {

                console.log('resp en usuarios.component es : ', resp);

                  // Desactivado por no tener un ID la tabla Personas de PADRON
                // this.totalPersonas = resp[1][0].maximo;
                // console.log('this.totalPersonas es : ', this.totalPersonas);

                this.usuarios = resp[0];
                console.log('this.usuarios es : ', this.usuarios);

                this.cargando = false;

              });

  }

// ==================================================
//        Elimina un usuario
// ==================================================

eliminarUsuario( usuario: Usuario ) {

  console.log('entro en eliminarUsuario cliente.IdPersona es ', usuario.IdUsuario);

  Swal.fire({
    title: '¿Esta seguro?',
    text: 'Esta a punto de borrar a ' + usuario.Apellidos + ' ' + usuario.Nombres,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borrar!'
  })
  .then( result => {

    if (result.value) {

      const parametro = usuario.IdUsuario.toString();

      this.usuariosService.eliminarUsuario( parametro )
                .subscribe( borrado => {
                    this.cargarUsuarios();
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Usuario Eliminado',
                      showConfirmButton: false,
                      timer: 2000
                    });
                });
    }

  });

}

// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalUsuarios ) {
    console.log('Entro primer if');
    return;
  }

  if ( desde < 0 ) {
    console.log('Entro seg if');
    return;
  }
  console.log('Llego');
  this.desde += valor;
  this.cargarUsuarios();

}

}
