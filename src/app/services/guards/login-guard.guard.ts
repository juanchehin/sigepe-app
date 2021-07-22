import { Injectable } from '@angular/core';
import { CanActivate, Router, Routes } from '@angular/router';
import { UsuarioService } from '../service.index';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public usuarioService: UsuarioService, public router: Router) {
  }
  canActivate() {

    // return true;

    if ( this.usuarioService.estaLogueado()) {
      console.log('PASO EL LOGIN GUARD , esta logueado');
      return true;
     } else {
       console.log('Bloqueado por LOGIN GUARD');
       this.router.navigate(['/login']);
       return false;
    }
    // return true;
  }

}
