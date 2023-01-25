import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PosService } from 'app/services/pos.service';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.scss']
})
export class CajaComponent implements OnInit {
  flujoValores: { cantidad: number; valor: number; tipo: string; }[];

  dineroEnCaja=[];
  vueltos=[];
  flujoDinero: any;
  cajaVisible:boolean;

  seccionesCajas=["Dinero Ingresar","Dinero sacar","Dinero caja"];
  indiceFlujo: number;

  getDineroEnCaja(){
    this.dineroEnCaja = [
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
        cantidad:50,
        valor:50,
        tipo:"moneda"
      },
      {
        cantidad:50,
        valor:10,
        tipo:"moneda"
      },
      {
        cantidad:50,
        valor:20,
        tipo:"moneda"
      },
      {
        cantidad:50,
        valor:50,
        tipo:"moneda"
      },
      {
        cantidad:30,
        valor:1000,
        tipo:"moneda"
      }
    ];
  }
  

  /*Funcion para calcular los vueltos TODO*/

  getVueltos(){
    this.vueltos = [
      {
        cantidad:0,
        valor:1000,
        tipo:"billete"
      },
      {
        cantidad:0,
        valor:2000,
        tipo:"billete"
      },
      {
        cantidad:5,
        valor:5000,
        tipo:"billete"
      },
      {
        cantidad:4,
        valor:10000,
        tipo:"billete"
      },
      {
        cantidad:0,
        valor:20000,
        tipo:"billete"
      },
      {
        cantidad:1,
        valor:50000,
        tipo:"billete"
      },
      {
        cantidad:1,
        valor:100000,
        tipo:"billete"
      },
      {
        cantidad:5,
        valor:50,
        tipo:"moneda"
      },
      {
        cantidad:0,
        valor:10,
        tipo:"moneda"
      },
      {
        cantidad:8,
        valor:20,
        tipo:"moneda"
      },
      {
        cantidad:0,
        valor:50,
        tipo:"moneda"
      },
      {
        cantidad:10,
        valor:1000,
        tipo:"moneda"
      }
    ];

    this._posService.setFlujoDineroCajero(this.vueltos);
  }

  sumatoriaEnCaja(){
    let valorTotal = 0;
    let valorTotalMonedas = 0;
    let valorTotalBilletes = 0;

    if (this.flujoDinero[2].valores) {
      this.flujoDinero[2].valores.filter((data)=>{return data.tipo=="moneda"}).forEach((data)=>{
        valorTotalMonedas += (data.valor*data.cantidad);
      });
  
      this.flujoDinero[2].valores.filter((data)=>{return data.tipo=="billete"}).forEach((data)=>{
        valorTotalBilletes += (data.valor*data.cantidad);
      });
    }

    valorTotal = valorTotalMonedas+valorTotalBilletes;
    //return {valorTotalBilletes,valorTotalMonedas,valorTotal};
  }

  sumatoriaFlujoSaliente(){
    let valorTotal = 0;
    let valorTotalMonedas = 0;
    let valorTotalBilletes = 0;

    this.flujoDinero[1].valores.filter((data)=>{return data.tipo=="moneda"}).forEach((data)=>{
      valorTotalMonedas += (data.valor*data.cantidad);
    });

    this.flujoDinero[1].valores.filter((data)=>{return data.tipo=="billete"}).forEach((data)=>{
      valorTotalBilletes += (data.valor*data.cantidad);
    });

    valorTotal = valorTotalMonedas+valorTotalBilletes;

    return {valorTotalBilletes,valorTotalMonedas,valorTotal};
  }

  sumatoriaVueltos(){
    let valorTotal = 0;
    let valorTotalMonedas = 0;
    let valorTotalBilletes = 0;

    this.vueltos.filter((data)=>{return data.tipo=="moneda"}).forEach((data)=>{
      valorTotalMonedas += (data.valor*data.cantidad);
    });

    this.vueltos.filter((data)=>{return data.tipo=="billete"}).forEach((data)=>{
      valorTotalBilletes += (data.valor*data.cantidad);
    });

    valorTotal = valorTotalMonedas+valorTotalBilletes;

    return {valorTotalBilletes,valorTotalMonedas,valorTotal};
  }

  cambiarIndiceFlujoIndice(indice){
    this._posService.setIndiceFlujoDinero$(indice);
  }

  getSeccionCajaSeleccionada(indice){
    if(this.seccionesCajas[indice]==this.flujoDinero[this.indiceFlujo].tipo) {
      return '#348fd8';
    }else{
      return '#2575bbbf';
    }
  }

  estaSeleccionada(indice){
    if(this.seccionesCajas[indice]==this.flujoDinero[this.indiceFlujo].tipo) {
      return true;
    }else{
      return false;
    }
  }

  constructor(private _posService:PosService) { }

  ngOnInit(): void {

    this._posService.getCajaVisible$().subscribe((data)=>{
      this.cajaVisible = data;
    });

    this._posService.getFlujoDineroCajero().subscribe((data)=>{this.vueltos = data;});
    this._posService.getIndiceFlujoDinero().subscribe((data)=>{

      this.indiceFlujo = data;

      this._posService.getFlujoDinero().subscribe((data)=>{
        this.flujoDinero = data;
      });
    });

    this.getDineroEnCaja();
  }

}
