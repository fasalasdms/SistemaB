import { Component, Input, OnInit } from '@angular/core';
import { PosService } from 'app/services/pos.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit {

  @Input() cols: string;


  numGap='2';
  classWidth="w-full";
  
  productos = [
    {
      codigo:"0001",
      nombre:"Portatil Dell 8gb",
      imagen:"1",
      colorBg:"rgba(49, 27, 146, 0.6)",
      colorText:"fff",
      stock:10,
      antes: 25000000,
      valor: 2500000,
      isInDiscount : true
    },
    {
      codigo:"0002",
      nombre:"Iphone X",
      imagen:"2",
      colorBg:"rgba(49, 27, 146, 0.6)",
      colorText:"fff",
      stock:10,
      antes: 13000000,
      valor: 1200000,
      isInDiscount : true
    },
    {
      codigo:"0003",
      nombre:"Samsung Flip",
      imagen:"3",
      colorBg:"rgba(49, 27, 146, 0.6)",
      colorText:"fff",
      stock:10,
      antes: 11000000,
      valor: 3200000,
      isInDiscount : true
    },
    {
      codigo:"0004",
      nombre:"Torre Gamer",
      imagen:"4",
      colorBg:"rgba(49, 27, 146, 0.6)",
      colorText:"fff",
      stock:10,
      antes: 12000000,
      valor: 1800000,
      isInDiscount : false
    },
    {
      codigo:"0005",
      nombre:"Torre Gamer Pro",
      imagen:"5",
      colorBg:"rgba(49, 27, 146, 0.6)",
      colorText:"fff",
      stock:0,
      antes: 12500000,
      valor: 7200000,
      isInDiscount : false
    },
    {
      codigo:"0007",
      nombre:"Portatil Dell 16gb",
      imagen:"1",
      colorBg:"rgba(49, 27, 146, 0.6)",
      colorText:"fff",
      stock:0,
      antes: 8000000,
      valor: 4200000,
      isInDiscount : true
    },
    {
      codigo:"0008",
      nombre:"Iphone XS",
      imagen:"2",
      colorBg:"rgba(49, 27, 146, 0.6)",
      colorText:"fff",
      stock:0,
      antes: 5000000,
      valor: 2000000,
      isInDiscount : false
    },
    {
      codigo:"0009",
      nombre:"Samsung Flip EDGE",
      imagen:"3",
      colorBg:"rgba(49, 27, 146, 0.6)",
      colorText:"fff",
      stock:10,
      antes: 5000000,
      valor: 1850000
    },
    {
      codigo:"0010",
      nombre:"Torre Gamer CompuMAx",
      imagen:"4",
      colorBg:"rgba(49, 27, 146, 0.6)",
      colorText:"fff",
      stock:0,
      antes: 12000000,
      valor: 1230000,
      isInDiscount : false
    }
  ];
  numCols: string;

  getImageProducto(nombreArchivo){
    return `url("assets/images/products/${nombreArchivo}.jpg")`
  }

  noStockGray(stock){
    return stock>0?"grayscale(0)":"grayscale(100%)";
  }

  getNumColsClass(){
    return `sm:grid-cols-${this.numCols}`;
  }

  getNumGapClass(){
    return `gap-${this.numGap}`;
  }

  getClassWidth(){
    return `${this.classWidth}`;
  }

  getIsInDiscount(product){
    return product.isInDiscount;
  }

  IsSoldOutGrayScale(product){
    return product.stock>0?"grayscale-0":"grayscale";
  }
  
  constructor( public dataService: PosService) { }

  dataPost(data){
    this.dataService.setProducto$(data);
    console.log('data producto', data)
  }

 

  ngOnInit(): void {
    this.numCols = this.cols;
  }

}
