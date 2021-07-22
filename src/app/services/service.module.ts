import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// tslint:disable-next-line: max-line-length
import { UsuarioService } from './service.index';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
    // LoginGuardGuard,
    // PersonaService
  ],
  providers: [
    // HeaderService,
    // PersonaService,
    UsuarioService
    // SubirArchivoService,
    // AsistenciaService,

  ]
  // declarations: []
})
export class ServiceModule { }
