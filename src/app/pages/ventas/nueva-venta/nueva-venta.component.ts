import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { clienteVentaComponent } from 'app/modals/cliente-modal/cliente-venta.component';
import { editarVentaComponent } from 'app/modals/editar-venta/editar-venta.component';
export interface PeriodicElement {
  item: number;
  codigo: number;
  producto: string;
  precio: number;
  cantidad: number;
  iva: number;
  descuento: number;
  total: number;
}

const data: PeriodicElement[] = [
  { codigo: 1, item: 1, producto: 'TENA BASIC 9 UNIDADES', precio: 40000, cantidad: 2, descuento: 0, iva: 19, total: 80000 },
  { codigo: 2, item: 2, producto: 'AK.1 DETERGENTE 3900G ', precio: 30900, cantidad: 1, descuento: 0, iva: 0, total: 30900 },
  { codigo: 3,  item: 3 ,  producto: 'NATU MALTA 1 LITRO',    precio: 3000, cantidad: 1, descuento: 0, iva: 19, total: 3000 },
  { codigo: 4,  item: 4 ,  producto: 'SIX PACK CERVEZA CORONA',  precio: 18000, cantidad: 3, descuento: 0, iva: 19, total: 54000 },
  // { codigo: 6,  item: 6 ,  producto: 'Carbon',     precio: 10000, cantidad: 1, descuento: 0, iva: 0 , total: 0  },
  // { codigo: 7,  item: 7 ,  producto: 'Nitrogen',   precio: 10000, cantidad: 1, descuento: 0, iva: 19, total: 19 },
  // { codigo: 8,  item: 8 ,  producto: 'Oxygen',     precio: 10000, cantidad: 1, descuento: 0, iva: 0 , total: 0  },
  // { codigo: 9,  item: 9 ,  producto: 'Fluorine',   precio: 10000, cantidad: 1, descuento: 0, iva: 19, total: 19 },
  // { codigo: 10, item: 10,  producto: 'Neon',       precio: 10000, cantidad: 1, descuento: 0, iva: 19, total: 19 },
];
@Component({
  selector: 'app-nueva-venta',
  templateUrl: './nueva-venta.component.html',
  styleUrls: ['./nueva-venta.component.scss']
})
export class NuevaVentaComponent implements OnInit {
  displayedColumns: string[] = ['item', 'codigo', 'producto', 'precio', 'cantidad', 'subtotal', 'acciones'];
  servicio= 0;
  constructor(private _formBuilder: FormBuilder,public dialog: MatDialog,) { }
  selectedForm: FormGroup;
  dataSource = data;
  dataLength = this.dataSource.length;
  ngOnInit(): void {
    this.selectedForm = this._formBuilder.group({
      id: [''],
      category: [''],
      name: ['', [Validators.required]],
      description: [''],
      tags: [[]],
      sku: [''],
      barcode: [''],
      brand: [''],
      vendor: [''],
      stock: [''],
      reserved: [''],
      cost: [''],
      basePrice: [''],
      taxPercent: [''],
      price: [''],
      weight: [''],
      thumbnail: [''],
      images: [[]],
      currentImageIndex: [0], // Image index that is currently being viewed
      active: [false]
    });
  }
  openEditModal(datos: any = null) {
    const dialogRef = this.dialog.open(editarVentaComponent, {
        width: '350px',
        height: 'auto',
        maxHeight: '850px',

        data: {
            item: datos,
        }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
        if (!result) return;

    });
}

openClienteModal(datos: any = null) {
  const dialogRef = this.dialog.open(clienteVentaComponent, {
      width: 'auto',
      height: 'auto',
      maxHeight: '850px',

      data: {
          item: datos,
      }
  });

  dialogRef.afterClosed().subscribe((result: any) => {
      if (!result) return;

  });
}
  ServicioSeleccionado(index) { //Modifica el valor 
    this.servicio = index;

  }
  getServicioSeleccionado() { //Devuelve el valor 

    return this.servicio;
  }

}
