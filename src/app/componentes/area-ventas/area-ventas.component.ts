import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ConfirmacionModalComponent } from 'app/modals/confirmacion-modal/confirmacion-modal.component';
import { EditarCampoComponent } from 'app/modals/editar-campo/editar-campo.component';
import { LotesModalComponent } from 'app/modals/lotes-modal/lotes-modal.component';
import { ApiService } from 'app/services/api.service';
import { PosService } from 'app/services/pos.service';



@Component({
  selector: 'app-area-ventas',
  templateUrl: './area-ventas.component.html',
  styleUrls: ['./area-ventas.component.scss']
})
export class AreaVentasComponent implements OnInit {
  ventaSeleccionada:any;
  venta1: any;
  indiceVenta: number;
  ventas:any;
  venta1Subject:any;
  evtProductoAniadido = false;

  ventaForm = this._formBuilder.group({
    codigo     : [, [Validators.required]]
  });

  productosAPI = [
    {
      id:1,
      precio:3000,
      iva:1000
    }
  ];

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this._posService.setIndiceVentas(tabChangeEvent.index);
  }

  lotesModal(lotes){
    const dialogRef = this.dialog.open(LotesModalComponent, {
      minWidth: '400px',
      height: 'auto',
      maxHeight: '850px',
      data:{
        lotes:lotes
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        return true;
      }else{
        return false;
      }
    });
  }

  getLotesDeProducto(idBodega,idItem,precio,idCliente){
    this._apiService.getQuery("apiUrlProductos",`Producto/ItemLote/${idBodega}/${idItem}/${precio}/${0}`,``).subscribe((res:any)=>{
      if (res.result.length > 1) {
        this.lotesModal(res.result);
      }
    });
  }

  agregarProductoVentaSeleccionada(){

    const ventaFormValor = this.ventaForm.value;


    this._apiService.getQuery("apiUrlProductos","Producto/Buscar/1",`itemBuscar=${ventaFormValor.codigo}`).subscribe((res:any)=>{

      const prod = res.result[0];

      this.getLotesDeProducto(prod.id_cot_bodega,prod.id_cot_item,prod.precio,0);

      const productoValores = res.result[0];

      this.ventas[this.indiceVenta].productos.push({
        descripcion:productoValores.descripcion,
        codigoProducto:parseInt(ventaFormValor.codigo),
        idProducto:productoValores.id_cot_item,
        descuento:parseInt(productoValores.descuento),
        precioProducto:parseInt(productoValores.precio),
        cantidad:1,
        totalIva:productoValores.precio*(productoValores.iva/100),
        iva:productoValores.iva,
        subtotal:productoValores.precio+(productoValores.precio*productoValores.iva/100),
        total:parseInt(productoValores.precio+(productoValores.precio*(productoValores.iva/100)))-productoValores.descuento
      });

      this.editarValoresVenta();

      this.eventoProductoAniadido();
      this.ventaForm.reset();
      
    });
    
  }

  editarValoresProducto(producto){
    const valorIva = (parseInt(producto.precioProducto)*(producto.iva/100));
    const precioIva = parseInt(producto.precioProducto)+valorIva;

    producto.subtotal = precioIva*producto.cantidad;
    producto.totalIva = valorIva*producto.cantidad;
    producto.subtotalIVA = ((parseInt(producto.precioProducto)*(parseInt(producto.iva)/100))+parseInt(producto.precioProducto))*parseInt(producto.cantidad);
    producto.total = (precioIva-producto.descuento)*producto.cantidad;
  }



  editarValoresVenta(){
    let subtotal = 0;
    let subtotalIVA = 0;
    let total = 0;
    let iva = 0;
    let descuento = 0;

    this.ventas[this.indiceVenta].productos.forEach((producto) => {
      subtotal += producto.subtotal;
      subtotalIVA += producto.subtotalIVA;
      iva += producto.totalIva;
      descuento += producto.descuento*producto.cantidad;
      total += producto.total;
    });

    this.ventas[this.indiceVenta].descuento = descuento;
    this.ventas[this.indiceVenta].iva = iva;
    this.ventas[this.indiceVenta].subtotal = subtotal;
    this.ventas[this.indiceVenta].total = total;

    this._posService.setVentas$(this.ventas);
  }

  aumentarCantidad(producto){
    producto.cantidad++;
    this.editarValoresProducto(producto);
    this.editarValoresVenta();
    //-----------------------------
  }

  reducirCantidad(producto){
    producto.cantidad--;
    //this.editarValoresVenta();
    this.editarValoresProducto(producto);
    this.editarValoresVenta();
  }

  eliminarProducto(producto){
    const productoSeleccionado = this.ventas[this.indiceVenta].productos.indexOf(producto);
    this.ventas[this.indiceVenta].productos.splice(productoSeleccionado, 1);
    this.editarValoresVenta();
  }

  eventoProductoAniadido(){
    this.evtProductoAniadido = true;

    setTimeout(() => {
      this.evtProductoAniadido=false;
    }, 200);
  }

  confirmacionModal(producto){
    const dialogRef = this.dialog.open(ConfirmacionModalComponent, {
      width: 'auto',
      height: 'auto',
      maxHeight: '850px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result){
        this.eliminarProducto(producto);
        this.eventoProductoAniadido();
      }
    });
  }

  setPrecio=(producto,accion,resultado=null)=>{
    if(accion=="open") {
      return {
        nombreCampo:"Precio producto",
        valorCampo:producto.precioProducto,
      }      
    }

    if(accion=="close") {
      if (resultado*producto.cantidad>producto.descuento*producto.cantidad){
        producto.precioProducto = resultado;
        this.editarValoresProducto(producto);
        this.editarValoresVenta();
      }else{
        this.openSnackBar("Error: Precio inferior al descuento");
      }
    }
  }

  setIVA=(producto,accion,resultado=null)=>{
    if(accion=="open") {
      return {
        nombreCampo:"IVA",
        valorCampo: producto.iva
      }      
    }
    if(accion=="close") {
      producto.iva = parseInt(resultado);
      this.editarValoresProducto(producto);
      this.editarValoresVenta();
    }
  }

  setDescuento=(producto,accion,resultado=null)=>{
    if(accion=="open") {
      return {
        nombreCampo:"Descuento",
        valorCampo:producto.descuento
      }
    }
    if(accion=="close") {
      if (resultado*producto.cantidad<producto.precioProducto*producto.cantidad) {
        producto.descuento = resultado;
        this.editarValoresProducto(producto);
        this.editarValoresVenta();
      }else{
        this.openSnackBar("Error: Descuento mayor al precio");
      }
    }
  }

  setCantidad=(producto,accion,resultado=null)=>{
    if(accion=="open") {
      return {
        nombreCampo:"Cantidad",
        valorCampo:producto.cantidad
      }
    }
    if(accion=="close") {
      if (resultado==0) {
        this.confirmacionModal(producto);        
      }else{
        producto.cantidad = resultado;
        this.editarValoresProducto(producto);
        this.editarValoresVenta();
      }
    }
  }

  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, "", {
      duration: 1500,
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass:"snack-bar-alerta"
    });
  }

  editarCampoModal(producto,funcionCampo){
    const dialogRef = this.dialog.open(EditarCampoComponent, {
      minWidth: '400px',
      height: 'auto',
      maxHeight: '850px',
      data:funcionCampo(producto,"open")
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result){
        funcionCampo(producto,"close",result);
      }
    });
  }

  
  constructor(private _formBuilder: FormBuilder,private _posService:PosService,private _apiService:ApiService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }
  
  ngOnInit(): void {

    this._posService.getVentas$().subscribe((data)=>{
      this.ventas = data;
    });

    // this._posService.facturar.subscribe(result => {
    //   result.data
    //   if(result){
    //     this.guardarVenta()
    //   }
    //   console.log('recibiendo', result.data)
    // })
    
    this._posService.getIndiceVentas().subscribe((indice)=>{
      this.indiceVenta = indice;
    });

  }

}