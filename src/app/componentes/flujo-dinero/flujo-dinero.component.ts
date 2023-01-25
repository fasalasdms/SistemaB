import { Component, OnInit } from '@angular/core';
import { PosService } from 'app/services/pos.service';
import { divisas } from 'app/componentes/flujo-dinero/divisas';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditarCampoComponent } from 'app/modals/editar-campo/editar-campo.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'app/services/api.service';
import { VistaFacturaComponent } from '../vista-factura/vista-factura.component';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { PuntosModalComponent } from 'app/modals/puntos-modal/puntos-modal.component';

@Component({
  selector: 'app-flujo-dinero',
  templateUrl: './flujo-dinero.component.html',
  styleUrls: ['./flujo-dinero.component.scss']
})
export class FlujoDineroComponent implements OnInit {

  billetes:Array<any>;
  monedas:Array<any>;
  divisaActual: string;
  totalFlujo: number;
  modoInteraccion="sumar";
  flujoValores: { cantidad: number; valor: number; tipo: string; }[];
  flujoDinero: any;
  indiceFlujoDinero: number = 0;
  flujoSeleccionado: any;
  itemFlujoSeleccionado:any;
  name: string;
  timeoutHandler: number;
  subject = new Subject<any>();
  modoPago: any;
  tipoPago: any;
  flujoDineroB: any;
  indiceFlujoDineroB: number;
  equivalenciaPuntos=0;
  valorPuntos=0;
  puntos=0;

  pagosSecundarios = [
    {nombre:"P1", estado:1, modoPagoId:null, modoPagoNombre:"", tipoPagoId:null, tipoPagoNombre:"",valor:0},
    {nombre:"P2", estado:1, modoPagoId:null, modoPagoNombre:"", tipoPagoId:null, tipoPagoNombre:"",valor:0},
    {nombre:"P3", estado:1, modoPagoId:null, modoPagoNombre:"", tipoPagoId:null, tipoPagoNombre:"",valor:0},
    {nombre:"P4", estado:1, modoPagoId:null, modoPagoNombre:"", tipoPagoId:null, tipoPagoNombre:"",valor:0},
    {nombre:"P5", estado:1, modoPagoId:null, modoPagoNombre:"", tipoPagoId:null, tipoPagoNombre:"",valor:0},
  ];

  puntosForm = this._formBuilder.group({
    puntosRedimidos     : [, [Validators.required]]
  });

  formaPagoForm = this._formBuilder.group({
    valor     : [, [Validators.required]],
    tipoPago     : [, [Validators.required]]
  });

  tipoForm = this._formBuilder.group({
    modoPago     : [, [Validators.required]]
  });
  indiceVenta: number;
  venta: any;
  ventas: any;
  puntosDisponibleCliente=0;

  getImageUnidadEfectivo(unidad){
    return `url("assets/images/${unidad.tipo}/${unidad.valor}.jpg")`;
  }

  getValorK(valor:number){
    if(valor>=1000){
      return (valor/1000)+"K";
    }else{
      return valor;
    }
  }

  constructor(private _posService:PosService, public dialog: MatDialog,private _formBuilder: FormBuilder, private _apiService:ApiService) { }

  getDineroEnCaja(){
    return [
      {
        cantidad:15,
        valor:1000,
        tipo:"billete"
      },
      {
        cantidad:25,
        valor:2000,
        tipo:"billete"
      },
      {
        cantidad:20,
        valor:5000,
        tipo:"billete"
      },
      {
        cantidad:2,
        valor:10000,
        tipo:"billete"
      },
      {
        cantidad:30,
        valor:20000,
        tipo:"billete"
      },
      {
        cantidad:50,
        valor:50000,
        tipo:"billete"
      },
      {
        cantidad:30,
        valor:100000,
        tipo:"billete"
      },
      {
        cantidad:80,
        valor:1000,
        tipo:"moneda"
      },
      {
        cantidad:100,
        valor:500,
        tipo:"moneda"
      },
      {
        cantidad:80,
        valor:200,
        tipo:"moneda"
      },
      {
        cantidad:60,
        valor:100,
        tipo:"moneda"
      },
      {
        cantidad:10,
        valor:50,
        tipo:"moneda"
      },
      
    ];
  }

  sumatoriaFlujo(_indiceSeleccionado=null){
    let valorTotal = 0;
    let valorTotalMonedas = 0;
    let valorTotalBilletes = 0;
    let indiceSeleccionado = _indiceSeleccionado?_indiceSeleccionado:this.indiceFlujoDinero;

    this.flujoDinero[indiceSeleccionado].valores.filter((data)=>{return data.tipo=="moneda"}).forEach((data)=>{
      valorTotalMonedas += (data.valor*data.cantidad);
    });

    this.flujoDinero[indiceSeleccionado].valores.filter((data)=>{return data.tipo=="billete"}).forEach((data)=>{
      valorTotalBilletes += (data.valor*data.cantidad);
    });

    this.flujoDinero[indiceSeleccionado].total =  valorTotalMonedas+valorTotalBilletes;
    this.flujoDinero[indiceSeleccionado].valorTotalMonedas =  valorTotalMonedas;
    this.flujoDinero[indiceSeleccionado].valorTotalBilletes = valorTotalBilletes;
  }

  seleccionarPago(pago){
    if (pago.tipo!='Puntos'){
      const valores = this.formaPagoForm.value;
      pago.tipoPagoNombre = valores.tipoPago.descripcion;
      pago.tipoPagoId = valores.tipoPago.id;
      pago.valor = valores.valor;
      pago.estado = 2;
      this.sumatoriaFlujoB();
      this._posService.setFlujoDineroB$(this.flujoDineroB);
      this.formaPagoForm.reset();
    }else{
      const valores = this.puntosForm.value;
      this.puntos = valores.puntosRedimidos;
      this.ventas[this.indiceVenta].puntosRedimidos={ "valorRedimido": this.puntos*this.valorPuntos, "puntosRedimidos":this.puntos };
      pago.estado = 2;
      this._posService.setVentas$(this.ventas);
    }
  }

  deseleccionarPago(pago){
    if (pago.tipo!='Puntos'){
      const valores = this.puntosForm.value;
      pago.tipoPagoNombre = "";
      pago.tipoPagoId = "";
      pago.valor = 0;
      pago.estado = 1;
      this.sumatoriaFlujoB();
      this._posService.setFlujoDineroB$(this.flujoDineroB);
    }else{
      this.ventas[this.indiceVenta].puntosRedimidos=null;
      pago.estado = 1;
      this.puntos=this.puntosDisponibleCliente;
      this._posService.setVentas$(this.ventas);
    }

  }

  sumatoriaFlujoB(){
    let valorSumatoria=0;
    this.flujoDineroB.valores.forEach((data)=>{
      valorSumatoria+=parseInt(data.valor);
    });
    this.flujoDineroB.total=valorSumatoria;
  }

  cambiarModoInteraccion(modo){
    this.modoInteraccion = modo;
  }

  setValoresPorDefectoDivisas(){
    const divisa = divisas.filter((data)=>{return data.nombre == this.divisaActual}).shift();
    const billetes = divisa.valores.filter((data)=>{return data.tipo=="billete"}).map((data)=>{
      return {cantidad:0,valor:data.valor,tipo:data.tipo}
    });
    const monedas = divisa.valores.filter((data)=>{return data.tipo=="moneda"}).map((data)=>{
      return {cantidad:0,valor:data.valor,tipo:data.tipo}
    });
    return billetes.concat(monedas);
  }

  llenarValoresFlujoDinero(){
    this.flujoDinero.forEach((flujo)=>{
      if (flujo.tipo!="Dinero caja") {
        flujo.valores=this.setValoresPorDefectoDivisas();
      }else{
        flujo.valores=this.getDineroEnCaja();
      }
    });
  }

  reiniciarCantidadesFlujo(){
    this.flujoDinero[this.indiceFlujoDinero].valores.forEach((valor)=>{ valor.cantidad=0});
    this.sumatoriaFlujo();
    this._posService.setFlujoDinero$(this.flujoDinero);
  }

  setCantidadItemFlujo(elemento){
    if (this.modoInteraccion == "sumar") {
      elemento.cantidad++;
      this.sumatoriaFlujo();
    }
    if (this.modoInteraccion == "restar" && elemento.cantidad>0) {
      elemento.cantidad--;
      this.sumatoriaFlujo();
    }
    if (this.modoInteraccion == "bloqueado") {
      elemento.cantidad=elemento.cantidad;
      this.sumatoriaFlujo();
    }
    if (this.modoInteraccion == "editar") {
      this.editarItemFlujoModal(elemento);
    }

    this.getFlujoDeDineroActual();
    this._posService.setFlujoDinero$(this.flujoDinero);
  }

  getFlujoDeDineroActual(){
    this.flujoSeleccionado=this.flujoDinero[this.indiceFlujoDinero];
  }

  editarItemFlujoModal(item){
    const dialogRef = this.dialog.open(EditarCampoComponent, {
      minWidth: '400px',
      height: 'auto',
      maxHeight: '850px',
      data:{
        nombreCampo:"Cantidad",
        valorCampo:item.cantidad
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result){
        item.cantidad = result;
        this.sumatoriaFlujo();
      }
    });
  }

  puntosModal(){
    const dialogRef = this.dialog.open(PuntosModalComponent, {
      minWidth: '400px',
      height: 'auto',
      maxHeight: '850px',
      data:{
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result){
      }
    });
  }

  getTiposPago(){
    this._apiService.getQuery("apiUrlFacturacion","Factura/TipoPago","").subscribe(async (res:any)=>{
      this.tipoPago = await res.result.filter((data)=>{return data.id!=60 && data.id!=61});
    });
  }

  getModosPago(){
    this._apiService.getQuery("apiUrlFacturacion","Factura/FormaPago","").subscribe(async (res:any)=>{
      this.modoPago = await res.result;
    });
  }

  getTipoFactura(){
    this._apiService.getQuery("apiUrlFacturacion","Factura/TipoFactura","").subscribe(async (res:any)=>{
    });
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this._posService.setIndiceFlujoDineroB$(tabChangeEvent.index);
  }

  getPuntos(){
    this._apiService.getQuery("apiUrlPuntos","RecaudoPuntos/EquivalenciaPuntos","").subscribe(async (res:any)=>{
      this.equivalenciaPuntos = await res.result.valor;
      this.valorPuntos = await this.puntos * this.equivalenciaPuntos;
      this.puntosForm.patchValue({'puntosRedimidos':this.puntos?this.puntos:0});
    });
  }

  cambioCantidadPuntosRedimir(){
    this.puntosForm.get("puntosRedimidos").valueChanges.subscribe(x => {
      this.puntos=parseInt(x);
      this.valorPuntos=this.puntos * this.equivalenciaPuntos;
   })
  }

  ngOnInit(): void {
    this._posService.getDivisaActual().subscribe((data)=>{
      this.divisaActual = data;

      this._posService.getFlujoDinero().subscribe((data1)=>{
        this.flujoDinero = data1;
        this.getFlujoDeDineroActual();

        this._posService.getIndiceFlujoDinero().subscribe((data2)=>{
          this.indiceFlujoDinero=data2;
        });
      });

      this._posService.getFlujoDineroB().subscribe((data2)=>{
        this.flujoDineroB=data2;

        this._posService.getIndiceFlujoDineroB().subscribe((data3)=>{
          this.indiceFlujoDineroB=data3;
        });
      });

    });
  
    this._posService.getIndiceVentas().subscribe((indice)=>{
      this.indiceVenta = indice;

      this._posService.getVentas$().subscribe((ventas)=>{
        this.ventas = ventas;
        this.puntosDisponibleCliente = ventas[this.indiceVenta]?.puntosCliente;
        this.puntos = this.puntosDisponibleCliente;
        this.getPuntos();
      });
    });


    this.llenarValoresFlujoDinero();
    this.getModosPago();
    this.getTiposPago();
    this.getTipoFactura();

    this.sumatoriaFlujo(2);

    this.cambioCantidadPuntosRedimir();
  }

}
