import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup  } from '@angular/forms';
import { RouterModule } from '@angular/router';
// **
import { PAGINAS_ROUTES } from './paginas.routes';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PersonasComponent } from './personas/personas.component';
import { PersonaComponent } from './personas/persona.component';

import { PaginasComponent } from './paginas.component';
import { SocioEconomicoComponent } from './socioeconomico/socioeconomico.component';
import { PedidoComponent } from './pedidos/pedido.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuarios/usuario.component';
import { VerSocioEconomicoComponent } from './socioeconomico/versocioeconomico.component';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { LocalidadesComponent } from './mantenimiento/localidades/localidades.component';
import { LocalidadComponent } from './mantenimiento/localidades/localidad.component';
import { CallesComponent } from './mantenimiento/calles/calles.component';
import { CalleComponent } from './mantenimiento/calles/calle.component';
import { ConstruccionesComponent } from './mantenimiento/construcciones/construcciones.component';
import { ConstruccionComponent } from './mantenimiento/construcciones/construccion.component';
import { EscuelasComponent } from './mantenimiento/escuelas/escuelas.component';
import { EscuelaComponent } from './mantenimiento/escuelas/escuela.component';
import { InmueblesComponent } from './mantenimiento/inmuebles/inmuebles.component';
import { InmuebleComponent } from './mantenimiento/inmuebles/inmueble.component';
import { LugaresTrabajosComponent } from './mantenimiento/lugarestrabajo/lugarestrabajos.component';
import { EditarLugarComponent } from './mantenimiento/lugarestrabajo/editarlugartrabajo.component';
import { TiposPedidosComponent } from './mantenimiento/tipospedido/tipospedidos.component';
import { TipoPedidoComponent } from './mantenimiento/tipospedido/tipopedido.component';
import { ViviendasComponent } from './mantenimiento/vivienda/viviendas.component';
import { ViviendaComponent } from './mantenimiento/vivienda/vivienda.component';
import { LugaresTrabajoComponent } from './mantenimiento/lugarestrabajo/lugarestrabajo.component';
import { GestionPedidosComponent } from './gestion/pedidos/gestionpedidos.component';
import { MisPedidosComponent } from './gestion/pedidos/mispedidos.component';
import { EstadoPedidoComponent } from './gestion/pedidos/estadopedido.component';
import { EditarLocalidadComponent } from './mantenimiento/localidades/editarlocalidad.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { ChartsModule } from 'ng2-charts';
import { DetalleMisPedidoComponent } from './gestion/pedidos/detalleMisPedidos.component';
import { HistorialSocioEconomicoComponent } from './socioeconomico/historialsocioeconomico.component';
import { EditarUsuarioComponent } from './usuarios/editarusuarios.componenet';
import { BarriosComponent } from './mantenimiento/barrios/barrios.component';
import { EditarEscuelaComponent } from './mantenimiento/escuelas/editarescuela.component';
import { BarrioComponent } from './mantenimiento/barrios/barrio.component';
import { EditarPedidoComponent } from './mantenimiento/tipospedido/editarpedido.component';
import { EditarCalleComponent } from './mantenimiento/calles/editarcalle.component';
import { EditarInmuebleComponent } from './mantenimiento/inmuebles/editarinmueble.component';
import { EditarConstruccionComponent } from './mantenimiento/construcciones/editarconstruccion.component';
import { EditarBarrioComponent } from './mantenimiento/barrios/editarbarrio.component';
import { EditarViviendaComponent } from './mantenimiento/vivienda/editarvivienda.component';
// import { TipoVivienda } from '../models/tipovivienda.model';
import { EditarTipoViviendaComponent } from './mantenimiento/tipovivienda/editartipovivienda.componenet';
import { TiposViviendasComponent } from './mantenimiento/tipovivienda/tiposviviendas.component';
import { TipoViviendaComponent } from './mantenimiento/tipovivienda/tipovivienda.component';
import { GruposComponent } from './control/censo/grupos.component';
import { GrupoComponent } from './control/censo/grupo.component';
import { PrincipalComponent } from './control/censo/principal.component';
import { ModuloAlimenticioComponent } from './mantenimiento/modulosalimenticios/moduloAlimenticio.component';
import { ModulosAlimenticiosComponent } from './mantenimiento/modulosalimenticios/modulos.component';
import { ControlComponent } from './control/control.component';
import { PersonaGrupoComponent } from './control/censo/personagrupo.component';
import { NuevoGrupoComponent } from './control/censo/nuevogrupo.component';
import { EntregasComponent } from './control/entregas/entregas.component';
import { EnfermedadComponent } from './mantenimiento/enfermedades/enfermedad.component';
import { EditarEnfermedadComponent } from './mantenimiento/enfermedades/editarenfermedad.component';
import { EnfermedadesComponent } from './mantenimiento/enfermedades/enfermedades.component';
import { NuevaEntregaComponent } from './control/entregas/nuevaentrega.component';
import { EditarModuloAlimenticioComponent } from './mantenimiento/modulosalimenticios/editarmoduloalimenticio.component';
import { EntregaComponent } from './control/entregas/entrega.component';
import { ImportadorComponent } from './importador/importador.component';



@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        ChartsModule,
        FormsModule,
        PAGINAS_ROUTES
    ],
    declarations: [
        NopagefoundComponent,
        HeaderComponent,
        PersonasComponent,
        PersonaComponent,
        PedidoComponent,
        PedidosComponent,
        PaginasComponent,
        SocioEconomicoComponent,
        UsuariosComponent,
        UsuarioComponent,
        EditarUsuarioComponent,
        VerSocioEconomicoComponent,
        MantenimientoComponent,
        LocalidadesComponent,
        LocalidadComponent,
        EditarLocalidadComponent,
        EditarLocalidadComponent,
        CallesComponent,
        CalleComponent,
        EditarCalleComponent,
        BarriosComponent,
        BarrioComponent,
        EditarBarrioComponent,
        ConstruccionesComponent,
        ConstruccionComponent,
        EditarConstruccionComponent,
        EscuelasComponent,
        EscuelaComponent,
        EditarEscuelaComponent,
        InmueblesComponent,
        InmuebleComponent,
        EditarInmuebleComponent,
        LugaresTrabajosComponent,
        LugaresTrabajoComponent,
        EditarLugarComponent,
        TiposPedidosComponent,
        EditarPedidoComponent,
        TipoPedidoComponent,
        ViviendasComponent,
        ViviendaComponent,
        EditarViviendaComponent,
        GestionPedidosComponent,
        MisPedidosComponent,
        DetalleMisPedidoComponent,
        EstadoPedidoComponent,
        EstadisticasComponent,
        HistorialSocioEconomicoComponent,
        TipoViviendaComponent,
        EditarTipoViviendaComponent,
        TiposViviendasComponent,
        // CONTROL
        ControlComponent,
        GruposComponent,
        GrupoComponent,
        NuevoGrupoComponent,
        PrincipalComponent,
        ModuloAlimenticioComponent,
        ModulosAlimenticiosComponent,
        EditarModuloAlimenticioComponent,
        PersonaGrupoComponent,
        EntregasComponent,
        EntregaComponent,
        EnfermedadComponent,
        EditarEnfermedadComponent,
        EnfermedadesComponent,
        // LoginComponent,
        // Entregas
        NuevaEntregaComponent,
        FooterComponent,
        ImportadorComponent
    ],
    exports: [
        NopagefoundComponent,
        PaginasComponent,
        HeaderComponent,
        // LoginComponent,
        FooterComponent,
        ReactiveFormsModule,
        FormsModule
    ]
})

export class PaginasModule { }
