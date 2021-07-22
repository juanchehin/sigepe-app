import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../service.index';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  IdRol: number;

  constructor(
    public usuarioService: UsuarioService,
    public router: Router) {
      this.IdRol = this.usuarioService.IdRol;
  }

  canActivate() {

    console.log('Entro en el AdminGuard y this.personaService.IdRol ', this.usuarioService.IdRol);
    console.log('Entro en el AdminGuard y this.IdRol ', this.IdRol);

    if ( this.usuarioService.IdRol !== 1) {  // 1: Rol Admin
      console.log('Bloqueado por ADMIN GUARD');
      this.usuarioService.logout();
      return false;

    } else {
      return true;
    }
  }
}
