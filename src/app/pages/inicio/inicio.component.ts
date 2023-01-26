import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertaModalComponent } from 'app/modals/alerta-modal/alerta-modal.component';
import { AreaClientesComponent } from 'app/modals/area-clientes/area-clientes.component';
import { ApiService } from 'app/services/api.service';
import { PosService } from 'app/services/pos.service';
import { map } from 'rxjs/operators';

export interface dataElement {
  item: number;
  codigo: number;
  producto: string;
  precio: number;
  cantidad: number;
  iva: number;
  descuento: number;
  total: number;
}

const data: dataElement[] = [
  { codigo: 1, item: 1,   producto: 'TENA BASIC 9 UNIDADES',    precio: 40000, cantidad: 2, descuento: 0, iva: 19, total: 80000 },
  { codigo: 2, item: 2,   producto: 'AK.1 DETERGENTE 3900G',    precio: 30900, cantidad: 1, descuento: 0, iva: 0, total: 30900 },
  { codigo: 3, item: 3 ,  producto: 'NATU MALTA 1 LITRO',       precio: 3000,  cantidad: 1, descuento: 0, iva: 19, total: 3000 },
  { codigo: 4, item: 4 ,  producto: 'SIX PACK CERVEZA CORONA',  precio: 18000, cantidad: 3, descuento: 0, iva: 19, total: 54000 },
];

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  dataSource = data;
  dataLength = this.dataSource.length;

  pedidoForm = this._formBuilder.group({
    idBodega     : [, []],
    idCliente     : [, []],
    idTipoPedido     : [, []],
    idFormaPago     : [, []],
    idContacto     : [, []],
    subTotal     : [, []],
    descuento     : [, []],
    iva     : [, []],
    total     : [, []],
    notas     : [, []],
    notasInternas     : [, []],
    ipoComsumo     : [, []],
  });

  archivoForm = this._formBuilder.group({
    archivo     : [, [Validators.required]]
  });

  dataBodegas: any;
  dataClientes: any;
  modoPago: any;
  dataTipoFactura: any;
  archivoSeleccionado: any;

  constructor(private _formBuilder: FormBuilder, private PostService: PosService, private _apiService: ApiService, public dialog: MatDialog) { }

  
  getBodegas(){
    this._apiService.getQuery("apiUrlBodegas","bodega",``).subscribe(async(res:any)=>{
      await console.log("Bodegas >", res);
      this.dataBodegas=await res.result;
    });
  }

  getClientes(){
    this._apiService.getQuery("apiUrlClientes","cliente",``).subscribe(async(res:any)=>{
      this.dataClientes=await res;
    });
  }

  getTipoFactura(){
    this._apiService.getQuery("apiUrlFacturacion","factura/tipoFactura",``).subscribe(async(res:any)=>{
      this.dataTipoFactura = await res.result;
    });
  }

  getFormaPago(){
    this._apiService.getQuery("apiUrlFacturacion","factura/tipoFactura",``).subscribe(async(res:any)=>{
      this.dataClientes=await res;
    });
  }

  getModosPago(){
    this._apiService.getQuery("apiUrlFacturacion","Factura/FormaPago","").subscribe(async (res:any)=>{
      this.modoPago = await res.result;
    });
  }

  async CambioInputArchivo(fileInputEvent: any) {
    this.archivoSeleccionado=await fileInputEvent.target.files[0];
  }


  abrirAreaClientesModal(){

    const dialogRef = this.dialog.open(AreaClientesComponent, {
      minWidth: '500px',
      height: 'auto',
      maxHeight: '850px'
      }
    );

    dialogRef.afterClosed().subscribe((result: any) => {

      /*if (result) {

          let contactoSelect = this.clienteContacto.filter( clienteContacto =>
          
          clienteContacto.id_cot_cliente_contacto == result
          
        )
      
          this.dataSource = contactoSelect[0]
          
          this.posService.setCliente$(contactoSelect[0]);

      }

      if (!result) return;

    */}
    );
  }

  getClienteSeleccionado(){
    this.PostService.getCliente().subscribe((data)=>{
      console.log("Cliente seleccionado =>", data);
    });
  }

  ngOnInit(): void {
    this.getClienteSeleccionado();
    this.getBodegas();
    this.getClientes();
    this.getTipoFactura();
    this.getModosPago();
  }

}