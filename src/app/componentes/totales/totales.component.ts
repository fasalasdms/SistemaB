import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataFactura, Item, PagoFactura, PuntosRedimidos } from 'app/model/DataFactura';
import { Client } from 'app/model/Cliente';
import { ApiService } from 'app/services/api.service';
import { PosService } from 'app/services/pos.service';
import { VistaFacturaComponent } from '../vista-factura/vista-factura.component';



const Puntos: PuntosRedimidos = {
valorRedimido: 1000,
puntosRedimidos: 1,
}

const PagoFacturas: PagoFactura [] =[{
idTipoPago: 1,
valorPagado: 1000,
iva: 0,
cambio: 0,
notas: "Notas del pago",
propina: 0,
fechaConsignacion: "2023-01-12T21:13:18.676Z"
}]

let Items: Item[]=[];

@Component({
  selector: 'app-totales',
  templateUrl: './totales.component.html',
  styleUrls: ['./totales.component.scss']
})
export class TotalesComponent implements OnInit {
  indice= 0;
  venta: any;
  flujoDinero: any;
  total: number;
  ventas = [];
  clienteId: any = 0;
  nombreCliente: any;
  cliente: Client;
  dataFactura: DataFactura;
 
  
  Facturar(){
    
    this.getVenta();
        
    this.dataFactura =
        
    {
           
      idBodega: 1,
           
      fecha: "2023-01-12T19:18:22.095Z",
           
      idTipoFactura: 91,
           
      idFormaPago: 111,
           
      idContacto: this.cliente.id_cot_cliente_contacto,
           
      idCliente: this.cliente.id,
           
      subTotal: this.ventas[this.indice]?.subtotal,
           
      totalDescuento: this.ventas[this.indice]?.descuento,
           
      totalIva: 0,
           
      totalTotal: this.ventas[this.indice]?.total,
           
      idMoneda: 0,
           
      tasa: 1,
           
      fechaEstimada: "2023-01-12T19:18:22.095Z",
           
      notasInternas: "Esto es una nora interna",
           
      notas: "notas normales",
           
      items: Items,
           
      puntosRedimidos: Puntos,
           
      pagoFactura: PagoFacturas
        
    };
     
    this._apiService.postFactura(this.dataFactura).subscribe((response: DataFactura) => {
          this. vistaFacturaModal(response)
        }, 
          
        error =>{
        
            console.log('Oops... Ocurrio un Error', error.error, error.origen)
           
          }
      );  
    }


  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, "", {
      duration: 1500,
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass:"snack-bar-alerta"
    });
  }

  sumatoriaFlujo(){
    let valorMonedas = 0;
    let valorBilletes = 0;
    this.flujoDinero[0].valores.filter((data)=>{return data.tipo == "moneda"}).forEach((data)=>{
      valorMonedas += (data.valor*data.cantidad);
    });

    this.flujoDinero[0].valores.filter((data)=>{return data.tipo == "billete"}).forEach((data)=>{
      valorBilletes += (data.valor*data.cantidad);
    });

    return {
      valorMonedas,valorBilletes,total:valorMonedas+valorBilletes
    }
  }

  recibirPago(){
    this.ventas[this.indice].estado = 2;
    this._posService.setVentas$(this.ventas);
  }

  ingresarPago(){
    if (this.total>=this.venta.total) {
      this.ventas[this.indice].estado = 3;
      this._posService.setVentas$(this.ventas);   
    }else{
      this.openSnackBar("Pago insuficiente");
    }
  }

  pagoMayorQueDeuda(){
    if (this.total>=this.venta.total) {
      return {bg:"#A5D6A7",text:"#2E7D32"}
    } else {
      return {bg:"#FFCDD2",text:"#B71C1C"}
    }
  }

  dividirTotalEnValores(total,valor){
    return total/valor
  }

  generarVueltos(){
    let valorVueltos = this.total-this.venta.total;
    const valores = this.flujoDinero[2].valores;
    valores.forEach((data)=>{
      valorVueltos = this.dividirTotalEnValores(valorVueltos,data.valor);
    });
  }

  vistaFacturaModal(factura: any = null){
    const dialogRef = this.dialog.open(VistaFacturaComponent, {
      data:{
        dataFactura: factura,
        venta:this.ventas[this.indice]
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      /*if(result){
        this.eliminarProducto(producto);
        this.eventoProductoAniadido();
      }*/
    });
  }

  constructor(private _posService:PosService, private _apiService: ApiService, private _snackBar: MatSnackBar, public dialog: MatDialog) { }
  
  agregarUsuarioAVenta(){
    
      this.ventas[this.indice].clienteId=this.cliente.id;
      
      this.ventas[this.indice].nombreCliente=this.cliente.razon_social;
      
      this.ventas[this.indice].nitCliente=this.cliente.nit;
      
      this.ventas[this.indice].celCliente=this.cliente.telefono;

      this.ventas[this.indice].puntosCliente=this.cliente.puntos;
      
      this._posService.setVentas$(this.ventas);
  
  }

  getVenta(){
    
    this._posService.getIndiceVentas().subscribe((indice)=>{
    
    this.indice = indice;
      
    this._posService.getVentas$().subscribe((ventas)=>{
        
        let indiceItem = 1;
        Items = [];
        ventas[this.indice].productos.forEach(data => {
         
          const itemFactura: Item = {
           
            idBodega: 1,
            renglon: indiceItem,
            idItem: data.idProducto,
            cantidad: data.cantidad,
            precioLista: data.precioProducto,
            precioCotizado: data.precioProducto,
            porcentajeIva: 0,
            notas: " ",
            porcentajeDescuento: 0,
            idItemLote: 0,
            conversion: 1,
            unidades: 0,
            precioMasIva: 0,
          
          }

          indiceItem++;
         
          Items.push(itemFactura)
         
          console.log('data foreach item',Items)
     
        });
      
          this.venta = ventas[this.indice];

          this.ventas = ventas;
      
        });
   
    });
  }
  
  getCliente(){
    this._posService.getCliente().subscribe((data)=>{
      this.cliente = data
    });
  }

  ngOnInit(): void {
    
    this._posService.getIndiceVentas().subscribe((indice)=>{
      this.indice = indice;

      this._posService.getVentas$().subscribe((ventas)=>{
        console.log('data venta listado', ventas[this.indice])
    
        this.venta = ventas[this.indice];

        this.ventas = ventas;
      });
    });
   
    this._posService.getFlujoDinero().subscribe((flujo)=>{
      this.flujoDinero = flujo;
      this.total = this.sumatoriaFlujo().total;
    });

      this.getCliente()

  }

}
