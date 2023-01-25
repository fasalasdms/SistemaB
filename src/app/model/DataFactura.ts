export interface Item {
    idBodega: number;
    renglon: number;
    idItem: number;
    cantidad: number;
    precioLista: number;
    precioCotizado: number;
    porcentajeIva: number;
    notas: string;
    porcentajeDescuento: number;
    idItemLote: number;
    conversion: number;
    unidades: number;
    precioMasIva: number;
  }
  
  export interface PuntosRedimidos {
    valorRedimido: number;
    puntosRedimidos: number;
  }
  
  export interface PagoFactura {
    idTipoPago: number;
    valorPagado: number;
    iva: number;
    cambio: number;
    notas: string;
    propina: number;
    fechaConsignacion: String;
  }
  export interface DataFactura {
  idBodega: number;
  fecha: string;
  idTipoFactura: number;
  idFormaPago: number;
  idContacto: number;
  idCliente: number;
  subTotal: number;
  totalDescuento: number;
  totalIva: number;
  totalTotal: number;
  idMoneda: number;
  tasa: number;
  fechaEstimada: string;
  notasInternas: string;
  notas: string;
  items: Item[];
  puntosRedimidos: PuntosRedimidos;
  pagoFactura: PagoFactura[];
  }

  