import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../service.index';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(
    public usuarioService: UsuarioService,
    public router: Router
  ) { }

  canActivate(): Promise<boolean> | boolean {
    console.log('Entro en verificaToken Guard');

    const token = this.usuarioService.token;  // TOKEN <-- String en base64
    const payload = JSON.parse( atob(token.split('.')[1]));  // <-- Obtengo la info del token, desde base64
    console.log('Entro en verificaToken Guard, payload es : ', payload);

    const expirado = this.expirado(payload.exp);

    if ( expirado ) {
      console.log('TOken expirado, no puedes seguir navegando :(');
      this.usuarioService.logout();
      return false;
    } else {
      console.log('TOken correcto, puedes seguir navegando :)');
      return this.verificaRenueva(payload.exp);
    }
  }

// ==================================================
//        Renueva el token
// ==================================================

  verificaRenueva( fechaExp: number): Promise<boolean> {
    return new Promise( (resolve, reject ) => {
      const tokenExp = new Date( fechaExp * 1000);
      const ahora = new Date();  // <-- Traer la fecha desde la BD por que esta es la fecha del sistema que puede ser modificada

      ahora.setTime( ahora.getTime() + ( 1 * 60 * 60 * 1000 ) );  // Fecha actual + 4 hs

      console.log(tokenExp);  // <-- Fecha expiracion del token
      console.log(ahora);  // <-- Fecha actual + 4 hs . Sirve para comparar

      if ( tokenExp.getTime() > ahora.getTime() ) {
        resolve(true);
      } else{
        console.log('Token proximo a vencer');
        this.usuarioService.renuevaToken()
          .subscribe( () => {
            resolve(true);
          }, () => {
            this.router.navigate(['/login']);
            reject(false);
          });
      }

      resolve(true);

    });
  }

// ==================================================
//        Verifica si el token expiro
// ==================================================

  expirado(fechaExp: number) {  // <-- Obtiene la fecha de expiracion del token
    const ahora = new Date().getTime() / 1000;  // <-- Fecha actual en [ms]

    if ( fechaExp < ahora ){
      console.log('Token expirado');
      return true;
    } else{
      console.log('Token NO expirado');
      return false;
    }
  }
}
