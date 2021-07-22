export class Persona {

    constructor(
        // Datos padron
        public DNI: string,
        public Apellidos?: string,
        public Nombres?: string,
        public Domicilio?: string,
        public Localidad?: string,
        public Departamento?: string,
        // Datos adicionales SIGEPE
        public IdCalleActual?: string,
        public NroCalleActual?: string,
        public IdLocalidad?: string,
        public Telefono?: string,
        public EmpresaTel?: string,
        public Manzana?: string,
        public Casa?: string,
        public Lote?: string,
        public IdBarrio?: string,
        public Observaciones?: string,
        public IdPersona?: string,
        public EstadoPerCovid?: string,
        public FechaHisopado?: string
    ) { }

}
