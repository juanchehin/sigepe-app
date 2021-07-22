export class Entrega {

    constructor(
        public IdEntrega?: string,
        public IdModuloAlimenticio?: string,
        public IdPersona?: string,
        public IdUsuario?: string,
        public FechaAlta?: string,
        public MaxCantEntregas?: string,
        public DireccionEntrega?: string,
        public Frecuencia?: string,
        public EstadoEntrega?: string,
        public Observaciones?: string,
        public IdBarrio?: string
    ) { }

}
