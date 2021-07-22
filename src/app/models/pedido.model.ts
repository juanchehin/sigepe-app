export class Pedido {

    constructor(
        public IdPedido?: string,
        public IdPersonaBeneficiario?: string,
        public IdPersonaSolicitante?: string,
        public IdUsuario?: string,
        public Fecha?: string,
        public Autorizado?: string,
        public Observaciones?: string,
        public Estado?: string,
        public pedido?: string,    // Nombre del tipo de pedido: ej : 'Ayuda economica'
        public ApellidosBeneficiario?: string,
        public NombresBeneficiario?: string
    ) { }

}
