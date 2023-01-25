export interface Client {
  
  id: number

  nit: string
  
  razon_social: string
  
  direccion: string
  
  id_cot_estado: number
  
  id_usuario_vendedor: number
  
  id_cot_cliente_actividad: number
  
  id_cot_cliente_origen: number
  
  privado: number
  
  id_cot_cliente_tipo: number
  
  id_cot_cliente_perfil: number
  
  cupo_credito: number
  
  id_cot_forma_pago: number
  
  id_cot_cliente_pais: number
  
  id_cot_cliente_contacto: number
  
  nombre_contacto: string
  
  telefono: number
  
  email: string
  
  puntos: number

}

export interface Pais {

  id: number

  result: [
    
    id: number,

    codigo: string,
    
    descripcion: string,
  
  ]

}

export interface TipoPerfil {
  
  id: number
  
  descripcion: string

}

export interface TipoCliente {

  id: number
  
  descripcion: string

}

export interface FormaPago {

  id: number

  descripcion: string

  cuantas_cuotas

  cuotas: number
  
  dcto1: number

  dcto2: number

  dcto3: number

  dcto4: number

  des2: string

  descuento_pie: number

  dias1: number
  
  dias2: number
  
  dias3: number
  
  dias4: number

  dias_credito: number

  dias_gracia: number

  explicacion: string

  interes: number

  mora: number

  tipo: number

  ver_crm: number

}

export interface Origen {

  id: number
  
  descripcion: string

}

export interface Actividad {

  id: number
  
  descripcion: string

}

export interface Estado {

  id: number
  
  descripcion: string

}

export interface Zona {

  id_padre: number
  
  id_hijo: number

  des_padre: string

  des_hijo: string


}

export interface Departamento {
  
  id: number

  codigo: string
  
  descripcion: string

}

export interface Ciudad {

  id: number

  codigo: string
  
  descripcion: string

}

export interface ClientePost {
  
  idCliente: number
          
  razonSocial: string
  
  url: string
  
  tipoCliente: number
  
  notas: string
  
  cupo: number
  
  digito: number
  
  idContacto: number
  
  codigo: string
  
  idTributario2: string
  
  nombre1: string
  
  nombre2: string
  
  apellido1: string
  
  apellido2: string
  
  telefono1: string
  
  telefono2: string
  
  fechaCumpleanio: Date
  
  email: string
  
  actividad: number
  
  origen: number
  
  tipoPerfil: number
  
  tipoIdentificacion: string
  
  formaPago: number
  
  nit: string
  
  estado: number
  
  tipoTributario: number
  
  idZona: number
  
  direccion: string
  
  pais: number

}
