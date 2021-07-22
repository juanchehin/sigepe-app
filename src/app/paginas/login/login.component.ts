import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
// import { PersonaService } from '../services/persona/persona.service';
import { UsuarioService, HeaderService } from '../../services/service.index';
// import { Persona } from '../../models/persona.model';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(
    public usuarioService: UsuarioService,
    public router: Router,
    public headerService: HeaderService
    ) { }
  ngOnInit() {
    this.usuarioService.logout();
  }

  // =============================================================
  //  Ingresar - Recibe usuario y contraseña del html
  // ===============================================================
  ingresar(forma: NgForm) {

    console.log('Ingreso a login.component y forma es : ', forma);

    if ( forma.invalid ) {
      console.log('Formulario invalido en login.component');
      return;
    }
    console.log('Formulario valido en login.component');

    const usuario = new Usuario();

    usuario.usuario = forma.value.usuario;
    usuario.Password = forma.value.Password;

    console.log('usuario en login.component.ts es : ', usuario);

    this.usuarioService.login(usuario)
      .subscribe(resp => {
        // console.log('Ahora debe ir al principal y resp es : ', resp);

        if ( resp === true) {
          this.router.navigate(['/personas']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error de login',
            // text: resp.message,
          });
        }
      });

    console.log('el valor de el formulario viene ahora en login.component:');

    console.log(forma.valid);
    console.log(forma.value);

    // this.router.navigate(['/principal']);

  }

}
