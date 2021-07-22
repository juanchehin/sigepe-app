import { RouterModule, Routes } from '@angular/router';


import { NopagefoundComponent } from './paginas/nopagefound/nopagefound.component';
import { LoginComponent } from './paginas/login/login.component';
import { PersonasComponent } from './paginas/personas/personas.component';




const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'principal', component: PersonasComponent },
    { path: '**', component: NopagefoundComponent }
];


export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
