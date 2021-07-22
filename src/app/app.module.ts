import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Rutas
import { APP_ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './paginas/login/login.component';
// import { HttpModule } from '@angular/common/http';

// Servicios

import { PaginasModule } from './paginas/paginas.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ServiceModule } from './services/service.module';
import { NgSelectModule } from '@ng-select/ng-select';



// import { NopagefoundComponent } from './paginas/nopagefound/nopagefound.component';
// import { principalComponent } from './pages/principal/principal.component';
// import { ProgressComponent } from './pages/progress/progress.component';
// import { Graficas1Component } from './pages/graficas1/graficas1.component';
// import { HeaderComponent } from './paginas/header/header.component';
// import { SidebarComponent } from './paginas/sidebar/sidebar.component';
// import { PagesComponent } from './pages/pages.component';
// import { PublicoComponent } from './publico/publico.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
    // PublicoComponent
//    ProfesionalComponent,
    // AcercaComponent
    // principalComponent,
    // ProgressComponent,
    // Graficas1Component,
    // NopagefoundComponent,
    // HeaderComponent,
    // SidebarComponent,
    // PagesComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    NgSelectModule,
    PaginasModule,
    ReactiveFormsModule,
    FormsModule,
    // HttpClientModule,
    ServiceModule
    // HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
