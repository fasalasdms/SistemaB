import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  filtroForm = this._formBuilder.group({
    nombre     : [, [Validators.required]],
    codigo     : [, [Validators.required]],
  });

  productoDetalleForm = this._formBuilder.group({
    cantidad     : [, [Validators.required]],
    total     : [, [Validators.required]],
  });

  producto: any;
  imagenProduto: any;
  isExpanded: boolean;
  flujoDinero: any;
  cajaVisible: any;

  constructor(private _formBuilder: FormBuilder, private PostService: PosService, private _apiService: ApiService) { }

  setcajaVisible(){
    if (this.cajaVisible == true) {
      this.PostService.setCajaVisible$(false);
    }else{
      this.PostService.setCajaVisible$(true);
    }
  }

  getColumnas(){
    if (this.cajaVisible) {
      return 'repeat(4, minmax(0, 1fr))';
    }else{
      return 'repeat(10, minmax(0, 1fr))';
    }
  }

  setSpanCaja(valorInicial,valorFinal){
    if (this.cajaVisible) {
      return `span ${valorInicial} / span ${valorInicial}`;
    }else{
      return `span ${valorFinal} / span ${valorFinal}`;
    }
  }

  ngOnInit(): void {
    this.PostService.disparador.subscribe(result => {
      this.rightToLeft = result.data
      this.Mover()
      console.log('recibiendo', result.data)
    })
    this.PostService.getProductoLista().subscribe((data) => {
      this.producto = data;
      this.getImageProducto(this.producto);
      //console.log(this.imagenProduto)
    });

    this._apiService.getQuery("apiUrlBodegas","Bodega","").subscribe((res)=>{
    });

    this._apiService.getQuery("apiUrlProductos","Producto/Buscar/1","itemBuscar=3").subscribe((res)=>{
    });

    this.PostService.getCajaVisible$().subscribe((data)=>{
      this.cajaVisible = data;
    });

  }

  public rightToLeft: boolean;

  Mover() {
    this.rightToLeft = !this.rightToLeft;
    document.body.dir = this.rightToLeft ? 'rtl' : '';
  }
  //Ventas

  ventas = [
    {
      nombre:"Vent1"
    },
    {
      nombre:"Vent2"
    },
    {
      nombre:"Vent3"
    },
    {
      nombre:"Vent4"
    },
    {
      nombre:"Vent5"
    }
  ];

  getImageProducto(producto:any){
    return this.imagenProduto = `url("assets/images/products/${producto?.imagen}.jpg")` 
  }

  noStockGray(stock){
    return stock>0?"grayscale(0)":"grayscale";
  }

}