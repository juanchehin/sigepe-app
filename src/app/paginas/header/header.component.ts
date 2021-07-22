import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/service.index';
import { PersonaService, UsuarioService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { Persona } from 'src/app/models/persona.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../app.component.css']
})
export class HeaderComponent implements OnInit {

  IdUsuario: string;
  id: number;
  Usuario: string;
  banderaAdmin = false;
  IdRol = 0;

  constructor(
    public personaService: PersonaService,
    public usuarioService: UsuarioService,
    public header: HeaderService,
    public router: Router ) {


    this.Usuario = localStorage.getItem('usuario'); // Cambiar esto y acceder desde el servicio, ver comentario de abajo
    this.comprobarLogueo();
    this.IdRol = this.usuarioService.IdRol;
    console.log('this.IdRol en constructor en header es : ', this.IdRol);
    this.IdUsuario = this.usuarioService.IdUsuario;
    console.log('this.usuarioService.IdUsuario en constructor en header es : ', this.usuarioService.IdUsuario);
    // this.comprobarRole();
    }

  ngOnInit() {
    this.banderaAdmin = this.usuarioService.comprobarRol();
    console.log('this.banderaAdmin en constructor en header es : ', this.banderaAdmin);
    // this.comprobarLogueo();
    // this.IdPersona = this.personaService.personaId;
    // this.correoActual = localStorage.getItem('usuario');
    // console.log('correoActual es ', this.correoActual);
    // this.header.cargarMenu();
    // this.menus = this.personaService.menu;
    // this.menus = this.personaService.menu;
    // console.log('this.menus en ngoninit en header es : ', this.menus);

  }


// ==================================================
//        Funcion para comprobar si esta logueado actualmente
// ==================================================
  comprobarLogueo() {
    // this.correoActual = localStorage.getItem('usuario');

    if (this.usuarioService.estaLogueado()) {
      // console.log('Estas logueado , no se muestra "iniciar sesion" HEADER, ERES ADMIN!!!');
      return false;
    } else {
      // console.log('No Estas logueado , se muestra "iniciar sesion"En HEADER, NO ERES ADMIN , se oculta el menu !!!');
      return true;
    }
  }

}
