import { RouterModule, Routes } from '@angular/router';
import { PaginasComponent } from './paginas.component';

// Personas
import { PersonasComponent } from './personas/personas.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { ImportadorComponent } from './importador/importador.component';


// Usuarios
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuarios/usuario.component';

// Servicios
import { LoginComponent } from './login/login.component';
import { PersonaComponent } from './personas/persona.component';
import { SocioEconomicoComponent } from './socioeconomico/socioeconomico.component';
import { PedidoComponent } from './pedidos/pedido.component';
import { PedidosComponent } from './pedidos/pedidos.component';


import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';

// Localidades
import { LocalidadesComponent } from './mantenimiento/localidades/localidades.component';
import { LocalidadComponent } from './mantenimiento/localidades/localidad.component';

// Calles
import { CallesComponent } from './mantenimiento/calles/calles.component';
import { CalleComponent } from './mantenimiento/calles/calle.component';
// Construcciones
import { ConstruccionComponent } from './mantenimiento/construcciones/construccion.component';
import { ConstruccionesComponent } from './mantenimiento/construcciones/construcciones.component';
// Escuelas
import { EscuelasComponent } from './mantenimiento/escuelas/escuelas.component';
import { EscuelaComponent } from './mantenimiento/escuelas/escuela.component';
// Inmuebles
import { InmueblesComponent } from './mantenimiento/inmuebles/inmuebles.component';
import { InmuebleComponent } from './mantenimiento/inmuebles/inmueble.component';
import { TiposPedidosComponent } from './mantenimiento/tipospedido/tipospedidos.component';
import { TipoPedidoComponent } from './mantenimiento/tipospedido/tipopedido.component';
import { ViviendasComponent } from './mantenimiento/vivienda/viviendas.component';
import { ViviendaComponent } from './mantenimiento/vivienda/vivienda.component';
import { LugaresTrabajosComponent } from './mantenimiento/lugarestrabajo/lugarestrabajos.component';
import { LugaresTrabajoComponent } from './mantenimiento/lugarestrabajo/lugarestrabajo.component';
import { GestionPedidosComponent } from './gestion/pedidos/gestionpedidos.component';
import { MisPedidosComponent } from './gestion/pedidos/mispedidos.component';
import { EstadoPedidoComponent } from './gestion/pedidos/estadopedido.component';
import { EditarLocalidadComponent } from './mantenimiento/localidades/editarlocalidad.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { VerSocioEconomicoComponent } from './socioeconomico/versocioeconomico.component';
import { DetalleMisPedidoComponent } from './gestion/pedidos/detalleMisPedidos.component';
import { HistorialSocioEconomicoComponent } from './socioeconomico/historialsocioeconomico.component';
import { EditarUsuarioComponent } from './usuarios/editarusuarios.componenet';
import { BarriosComponent } from './mantenimiento/barrios/barrios.component';
import { EditarEscuelaComponent } from './mantenimiento/escuelas/editarescuela.component';
import { BarrioComponent } from './mantenimiento/barrios/barrio.component';

// GUARDS
import { AdminGuard } from '../services/guards/admin.guard';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { EditarCalleComponent } from './mantenimiento/calles/editarcalle.component';
import { EditarConstruccionComponent } from './mantenimiento/construcciones/editarconstruccion.component';
import { EditarInmuebleComponent } from './mantenimiento/inmuebles/editarinmueble.component';
import { EditarPedidoComponent } from './mantenimiento/tipospedido/editarpedido.component';
import { EditarLugarComponent } from './mantenimiento/lugarestrabajo/editarlugartrabajo.component';
import { EditarBarrioComponent } from './mantenimiento/barrios/editarbarrio.component';
import { EditarViviendaComponent } from './mantenimiento/vivienda/editarvivienda.component';
import { TiposViviendasComponent } from './mantenimiento/tipovivienda/tiposviviendas.component';
import { TipoViviendaComponent } from './mantenimiento/tipovivienda/tipovivienda.component';
import { EditarTipoViviendaComponent } from './mantenimiento/tipovivienda/editartipovivienda.componenet';
// CONTROL
import { ModuloAlimenticioComponent } from './mantenimiento/modulosalimenticios/moduloAlimenticio.component';
import { ModulosAlimenticiosComponent } from './mantenimiento/modulosalimenticios/modulos.component';
import { PrincipalComponent } from './control/censo/principal.component';
import { NuevoGrupoComponent } from './control/censo/nuevogrupo.component';
import { ControlComponent } from './control/control.component';
import { GruposComponent } from './control/censo/grupos.component';
import { PersonaGrupoComponent } from './control/censo/personagrupo.component';
import { GrupoComponent } from './control/censo/grupo.component';
import { EntregasComponent } from './control/entregas/entregas.component';
import { EditarEnfermedadComponent } from './mantenimiento/enfermedades/editarenfermedad.component';
import { EnfermedadesComponent } from './mantenimiento/enfermedades/enfermedades.component';
import { EnfermedadComponent } from './mantenimiento/enfermedades/enfermedad.component';
import { NuevaEntregaComponent } from './control/entregas/nuevaentrega.component';
import { EditarModuloAlimenticioComponent } from './mantenimiento/modulosalimenticios/editarmoduloalimenticio.component';
import { EntregaComponent } from './control/entregas/entrega.component';

const pagesRoutes: Routes = [
    // Patch donde pueden acceder solo los usuarios
    {
        path: '',
        component: PaginasComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    },
    {
        path: '',
        component: PaginasComponent,
        canActivate: [LoginGuardGuard, VerificaTokenGuard],
        children: [
            // { path: 'login', component: LoginComponent },
            { path: 'personas', component: PersonasComponent },
            { path: 'personas/agregar', component: PersonaComponent },
            { path: 'persona/:id', component: SocioEconomicoComponent },    // modificar ruta : persona/socioeconomico/:id
            { path: 'pedidos/nuevo/:id', component: PedidoComponent },
            // Pedidos
            { path: 'pedidos/:id', component: PedidosComponent },
            { path: 'gestion/pedidos', component: GestionPedidosComponent },
            { path: 'gestion/pedidos/:IdPedido', component: EstadoPedidoComponent },
            { path: 'empleado/pedidos/:id', component: MisPedidosComponent },
            { path: 'empleado/pedidos/detalles/:IdPedido', component: DetalleMisPedidoComponent },

            // SocioEconomico
            { path: 'personas/empleado/socioeconomico/:IdPersona/:IdSocioeconomico', component: VerSocioEconomicoComponent },
            { path: 'personas/socioeconomico/historial/:IdPersona', component: HistorialSocioEconomicoComponent },
            { path: 'persona/socioeconomico/:id', component: SocioEconomicoComponent },    // modificar ruta : persona/socioeconomico/:id
            // { path: 'principal', component: PersonasComponent  },
            { path: 'nopagefound', component: NopagefoundComponent  },
            // CONTROL - Censo
            { path: 'control', component: ControlComponent },
            { path: 'control/censo', component: PrincipalComponent },
            { path: 'control/censo/grupo/listar', component: GruposComponent },
            { path: 'control/censo/grupo/nuevo', component: NuevoGrupoComponent },
            { path: 'control/censo/grupo/persona/:IdGrupoFamiliar', component: PersonaGrupoComponent },
            // CONTROL - entregas
            { path: 'control/entregas/listar', component: EntregasComponent },
            { path: 'control/entrega/:IdEntrega', component: EntregaComponent },
            { path: 'control/entregas/:IdPersona', component: NuevaEntregaComponent },
            { path: 'control/censo/grupo/:IdGrupoFamiliar', component: GrupoComponent },
            /*{ path: 'cliente/graficas/:id', component: GraficasComponent },
            { path: 'cliente/asistencias/:id', component: AsistenciasComponent },
            { path: 'cliente/mediciones/:id', component: MedicionesComponent },*/
            { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    },
    {
        path: '',
        component: PaginasComponent,
        canActivate: [LoginGuardGuard, AdminGuard, VerificaTokenGuard],
        children: [
            // Mantenimiento SIGEPE
            { path: 'mantenimiento', component: MantenimientoComponent },
            // Importador personas
            { path: 'importador', component: ImportadorComponent },
            // Barrios
            { path: 'mantenimiento/barrios', component: BarriosComponent },
            { path: 'mantenimiento/barrios/nuevo', component: BarrioComponent },
            { path: 'mantenimiento/barrios/editar/:IdBarrio', component: EditarBarrioComponent },
            // CALLES
            { path: 'mantenimiento/calles', component: CallesComponent },
            { path: 'mantenimiento/calles/nuevo', component: CalleComponent },
            { path: 'mantenimiento/calles/editar/:IdCalle', component: EditarCalleComponent },
            // CONSTRUCCIONES
            { path: 'mantenimiento/construcciones', component: ConstruccionesComponent },
            { path: 'mantenimiento/construcciones/nuevo', component: ConstruccionComponent },
            { path: 'mantenimiento/construcciones/editar/:IdConstruccion', component: EditarConstruccionComponent },
            // Personas
            { path: 'personas', component: PersonasComponent },
            { path: 'personas/agregar', component: PersonaComponent },
            // LOCALIDADES
            { path: 'mantenimiento/localidades', component: LocalidadesComponent },
            { path: 'mantenimiento/localidades/nuevo', component: LocalidadComponent },
            { path: 'mantenimiento/localidades/editar/:IdLocalidad', component: EditarLocalidadComponent },
            // ESCUELAS
            { path: 'mantenimiento/escuelas', component: EscuelasComponent },
            { path: 'mantenimiento/escuelas/nuevo', component: EscuelaComponent },
            { path: 'mantenimiento/escuelas/editar/:IdEscuela', component: EditarEscuelaComponent },
            // INMUEBLES
            { path: 'mantenimiento/inmuebles', component: InmueblesComponent },
            { path: 'mantenimiento/inmuebles/nuevo', component: InmuebleComponent },
            { path: 'mantenimiento/inmuebles/editar/:IdInmueble', component: EditarInmuebleComponent },
            // TIPOS DE PEDIDO
            { path: 'mantenimiento/tipospedidos', component: TiposPedidosComponent },
            { path: 'mantenimiento/tipospedidos/nuevo', component: TipoPedidoComponent },
            { path: 'mantenimiento/tipospedidos/editar/:IdTIpoPedido', component: EditarPedidoComponent },
            // TIPOS DE VIVIENDA
            { path: 'mantenimiento/tiposviviendas', component: TiposViviendasComponent },
            { path: 'mantenimiento/tiposviviendas/nuevo', component: TipoViviendaComponent },
            { path: 'mantenimiento/tiposviviendas/editar/:IdTipoVivienda', component: EditarTipoViviendaComponent },
            // VIVIENDA
            { path: 'mantenimiento/viviendas', component: ViviendasComponent },
            { path: 'mantenimiento/viviendas/nuevo', component: ViviendaComponent },
            { path: 'mantenimiento/viviendas/editar/:IdVivienda', component: EditarViviendaComponent },
            // LUGARES DE TRABAJO
            { path: 'mantenimiento/lugarestrabajo', component: LugaresTrabajosComponent },
            { path: 'mantenimiento/lugarestrabajo/nuevo', component: LugaresTrabajoComponent },
            { path: 'mantenimiento/lugarestrabajo/editar/:IdLugar', component: EditarLugarComponent },
            // Modulos alimenticions
            { path: 'mantenimiento/modulosalimenticios', component: ModulosAlimenticiosComponent },
            { path: 'mantenimiento/modulosalimenticios/nuevo', component: ModuloAlimenticioComponent },
            { path: 'mantenimiento/modulosalimenticios/editar/:IdModuloAlimenticio', component: EditarModuloAlimenticioComponent },
            // LUGARES DE TRABAJO
            { path: 'mantenimiento/enfermedades', component: EnfermedadesComponent },
            { path: 'mantenimiento/enfermedades/nuevo', component: EnfermedadComponent },
            { path: 'mantenimiento/enfermedades/editar/:IdEnfermedad', component: EditarEnfermedadComponent },
            // { path: 'control/grupos', component: PrincipalComponent },
            // Estadisticas
            { path: 'estadisticas', component: EstadisticasComponent },
            // Usuarios
            { path: 'usuarios', component: UsuariosComponent },
            { path: 'usuarios/nuevo', component: UsuarioComponent },
            { path: 'usuario/editar/:IdUsuario', component: EditarUsuarioComponent },
            { path: 'nopagefound', component: NopagefoundComponent  },
            { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    }
];

export const PAGINAS_ROUTES = RouterModule.forChild( pagesRoutes );
