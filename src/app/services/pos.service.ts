import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PosService {
  private orientacion$: BehaviorSubject<string> = new BehaviorSubject<string>("derecha");
  private divisaActual$: BehaviorSubject<string> = new BehaviorSubject<string>("COP");
  private flujoDineroCliente$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private flujoDineroCajero$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private productoSeleccionado$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private cajaVisible$: BehaviorSubject<any> = new BehaviorSubject<any>(true);
  private clienteSeleccionado$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  flujoDinero = [
    {tipo:"Dinero Ingresar",valores:[],total:0,valorTotalMonedas:0,valorTotalBilletes:0},{tipo:"Dinero sacar",valores:[],total:0,valorTotalMonedas:0,valorTotalBilletes:0},{tipo:"Dinero caja",valores:[],total:0,valorTotalMonedas:0,valorTotalBilletes:0},
  ];

  flujoDineroB = {
    total:0,
    valores:[
      {id:1,estado:1,tipo:"Puntos",tipoPagoNombre:"Puntos",tipoPagoId:"",valor:0},
      {id:1,estado:1,tipo:"Dinero Ingresar",tipoPagoNombre:"",tipoPagoId:"",valor:0},
      {id:2,estado:1,tipo:"Dinero Ingresar",tipoPagoNombre:"",tipoPagoId:"",valor:0},
      {id:3,estado:1,tipo:"Dinero Ingresar",tipoPagoNombre:"",tipoPagoId:"",valor:0},
      {id:4,estado:1,tipo:"Dinero Ingresar",tipoPagoNombre:"",tipoPagoId:"",valor:0},
      {id:5,estado:1,tipo:"Dinero Ingresar",tipoPagoNombre:"",tipoPagoId:"",valor:0}
    ]
  };

  private flujoDinero$: BehaviorSubject<any> = new BehaviorSubject<any>(this.flujoDinero);
  private flujoDineroB$: BehaviorSubject<any> = new BehaviorSubject<any>(this.flujoDineroB);
  private indiceFlujoDinero$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private indiceFlujoDineroB$: BehaviorSubject<number> = new BehaviorSubject<number>(0);


  /*VALORES VENTAS*/

  venta1 = {
    estado:1,
    idCliente:null,
    nombreCliente:"",
    nombre:'VP 1',
    descuento:0,
    iva:0,
    totalIva:0,
    subtotal:0,
    total:0,
    puntosRedimidos:{},
    productos:[]
  };

  venta2 = {
    estado:1,
    idCliente:null,
    nombreCliente:"",
    nombre:'VP 2',
    descuento:0,
    iva:0,
    totalIva:0,
    subtotal:0,
    total:0,
    puntosRedimidos:{},
    productos:[]
  };

  venta3 = {
    estado:1,
    idCliente:0,
    nombreCliente:"",
    nombre:'VP 3',
    descuento:0,
    iva:0,
    totalIva:0,
    subtotal:0,
    total:0,
    puntosRedimidos:{},
    productos:[]
  };

  venta4 = {
    estado:1,
    idCliente:0,
    nombreCliente:"",
    nombre:'VP 4',
    descuento:0,
    iva:0,
    totalIva:0,
    subtotal:0,
    total:0,
    puntosRedimidos:{},
    productos:[]
  };

  venta5 = {
    estado:1,
    idCliente:0,
    nombreCliente:"",
    nombre:'VP 5',
    descuento:0,
    iva:0,
    totalIva:0,
    subtotal:0,
    total:0,
    puntosRedimidos:{},
    productos:[]
  }


  //Ventas

  private indiceVentas$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private ventas$: BehaviorSubject<any> = new BehaviorSubject<any>([this.venta1,this.venta2,this.venta3,this.venta4,this.venta5]);

  /*GETTERS*/

  @Output() disparador: EventEmitter<any> = new EventEmitter;

  @Output() cliente: EventEmitter<any> = new EventEmitter;

  @Output() facturar: EventEmitter<any> = new EventEmitter;

  getOrientacion(){
    return this.orientacion$.asObservable();
  }

  getDivisaActual(){
    return this.divisaActual$.asObservable();
  }

  getFlujoDineroCliente(){
    return this.flujoDineroCliente$.asObservable();
  }

  getFlujoDineroCajero(){
    return this.flujoDineroCajero$.asObservable();
  }

  getVentas$(){
    return this.ventas$.asObservable();
  }

  getIndiceVentas(){
    return this.indiceVentas$.asObservable();
  }
  getProductoLista() {
    return this.productoSeleccionado$.asObservable();
  }

  getFlujoDinero(){
    return this.flujoDinero$.asObservable();
  }

  getFlujoDineroB(){
    return this.flujoDineroB$.asObservable();
  }
  getIndiceFlujoDinero(){
    return this.indiceFlujoDinero$.asObservable();
  }

  getIndiceFlujoDineroB(){
    return this.indiceFlujoDineroB$.asObservable();
  }

  getCajaVisible$(){
    return this.cajaVisible$.asObservable();
  }

  getCliente() {
    return this.clienteSeleccionado$.asObservable();
  }

  /*
  getVentaPorIndice(i){
    return this.ventas[i].asObservable();
  }*/

  /*
  getVentaSeleccionada(){
    this.indiceVentas$.subscribe((i)=>{
      return this.ventas[i].asObservable();
    });
  }*/

  /*SETTERS*/

  setOrientacion(valor:string){
    this.orientacion$.next(valor);
  }

  setDivisaActual(valor:string){
    this.divisaActual$.next(valor);
  }

  setFlujoDineroCliente(valor:any){
    this.flujoDineroCliente$.next(valor);
  }

  setFlujoDineroCajero(valor:any){
    this.flujoDineroCajero$.next(valor);
  }

  setIndiceVentas(valor){
    return this.indiceVentas$.next(valor);
  }

  setVentas$(valor){
    return this.ventas$.next(valor);
  }

  setProducto$(data){
    return this.productoSeleccionado$.next(data)
  }

  setFlujoDinero$(valor){
    return this.flujoDinero$.next(valor);
  }

  setIndiceFlujoDinero$(valor){
    return this.indiceFlujoDinero$.next(valor);
  }

  setFlujoDineroB$(valor){
    return this.flujoDineroB$.next(valor);
  }

  setIndiceFlujoDineroB$(valor){
    return this.indiceFlujoDineroB$.next(valor);
  }

  setCajaVisible$(valor){
    return this.cajaVisible$.next(valor);
  }

  setCliente$(data) {
    return this.clienteSeleccionado$.next(data)
  }

  /*
  setVentaSeleccionada(valor){
    this.indiceVentas$.subscribe((i)=>{
      return this.ventas[i].next(valor);
    });
  }*/

  constructor() { }
}
