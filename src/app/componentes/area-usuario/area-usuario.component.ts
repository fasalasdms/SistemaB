import { Component, OnInit } from '@angular/core';
import { PosService } from 'app/services/pos.service';

@Component({
  selector: 'app-area-usuario',
  templateUrl: './area-usuario.component.html',
  styleUrls: ['./area-usuario.component.scss']
})
export class AreaUsuarioComponent implements OnInit {

  ultPedido={
    nombreCliente:"JuanPérez",
    nombreCajero:"Fernando Andrés Salas",
    numProds:30,
    valor:200000
  };

  ventasHoy={
    numProds:30,
    numVentas:10,
    valor:200000
  };
  flujoDineroB: any;


  constructor(private _posService: PosService) { }

  ngOnInit(): void {
    this._posService.getFlujoDineroB().subscribe((data)=>{
      this.flujoDineroB=data.total;
    });
  }

}
